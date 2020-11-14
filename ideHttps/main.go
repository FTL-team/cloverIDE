package main

import (
	"bytes"
	"crypto/rand"
	"crypto/rsa"
	"crypto/tls"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"fmt"
	"io/ioutil"
	"log"
	"math/big"
	"net"
	"net/http"
	"time"
)

func createCert(isCA bool, ips []net.IP, dns []string) (*x509.Certificate, *rsa.PrivateKey, error) {
	CAPOSTFIX := ""
	if isCA {
		CAPOSTFIX = " CA"
	}
	SerialNumber, err := rand.Int(rand.Reader, big.NewInt(999999))
	if err != nil {
		return nil, nil, err
	}

	KeyUsage := x509.KeyUsageDigitalSignature
	if isCA {
		KeyUsage |= x509.KeyUsageCertSign
	} else {
		KeyUsage |= x509.KeyUsageKeyEncipherment
	}

	cert := &x509.Certificate{
		SerialNumber: SerialNumber,

		Subject: pkix.Name{
			CommonName:    "Clover" + CAPOSTFIX + "cert",
			Organization:  []string{"Clover" + CAPOSTFIX},
			Country:       []string{"AQ"},
			Province:      []string{""},
			Locality:      []string{"In your mind"},
			StreetAddress: []string{"Copter"},
			PostalCode:    []string{"42042"},
		},
		IPAddresses:           ips,
		DNSNames:              dns,
		NotBefore:             time.Now(),
		NotAfter:              time.Now().AddDate(10, 0, 0),
		IsCA:                  isCA,
		ExtKeyUsage:           []x509.ExtKeyUsage{x509.ExtKeyUsageServerAuth},
		KeyUsage:              KeyUsage,
		BasicConstraintsValid: true,
	}

	privKey, err := rsa.GenerateKey(rand.Reader, 1024)
	if err != nil {
		return nil, nil, err
	}

	return cert, privKey, nil
}

func signCert(target *x509.Certificate, ca *x509.Certificate, targetPrivKey *rsa.PrivateKey, caPrivKey *rsa.PrivateKey) ([]byte, error) {
	bytes, err := x509.CreateCertificate(rand.Reader, target, ca, &targetPrivKey.PublicKey, caPrivKey)
	if err != nil {
		return nil, err
	}
	return bytes, nil
}

func pemEncode(certBytes []byte, certPrivKey *rsa.PrivateKey) (*bytes.Buffer, *bytes.Buffer) {
	certPEM := new(bytes.Buffer)
	pem.Encode(certPEM, &pem.Block{
		Type:  "CERTIFICATE",
		Bytes: certBytes,
	})

	certPrivKeyPEM := new(bytes.Buffer)
	pem.Encode(certPrivKeyPEM, &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(certPrivKey),
	})
	return certPEM, certPrivKeyPEM
}

func saveCert(cert *bytes.Buffer, privKey *bytes.Buffer, name string) error {
	err := ioutil.WriteFile(name+".cert.pem", cert.Bytes(), 0644)
	if err != nil {
		return err
	}

	err = ioutil.WriteFile(name+".key.pem", privKey.Bytes(), 0644)
	if err != nil {
		return err
	}

	return nil
}

func loadCert(name string) ([]byte, *x509.Certificate, *rsa.PrivateKey, error) {
	certBuffer, err := ioutil.ReadFile(name + ".cert.pem")
	if err != nil {
		return nil, nil, nil, err
	}

	certBlock, _ := pem.Decode(certBuffer)
	cert, err := x509.ParseCertificate(certBlock.Bytes)
	if err != nil {
		return nil, nil, nil, err
	}

	keyBuffer, err := ioutil.ReadFile(name + ".key.pem")
	if err != nil {
		return nil, nil, nil, err
	}

	keyBlock, _ := pem.Decode(keyBuffer)
	key, err := x509.ParsePKCS1PrivateKey(keyBlock.Bytes)
	if err != nil {
		return nil, nil, nil, err
	}

	return certBlock.Bytes, cert, key, nil
}

func returnCert(helloInfo *tls.ClientHelloInfo) (*tls.Certificate, error) {
	//helloInfo.ServerName ( This contains our Server Name )
	if helloInfo.ServerName == "" {
		tlsCert, tlsPrivKey, err := createCert(false, []net.IP{helloInfo.Conn.LocalAddr().(*net.TCPAddr).IP}, nil)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		tlsBytes, err := signCert(tlsCert, caCert, tlsPrivKey, caPrivKey)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		tlsPEM, tlsPrivKeyPEM := pemEncode(tlsBytes, tlsPrivKey)

		serverCert, err := tls.X509KeyPair(tlsPEM.Bytes(), tlsPrivKeyPEM.Bytes())
		return &serverCert, nil
	}


	tlsCert, tlsPrivKey, err := createCert(false, nil, []string{helloInfo.ServerName})
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	tlsBytes, err := signCert(tlsCert, caCert, tlsPrivKey, caPrivKey)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	tlsPEM, tlsPrivKeyPEM := pemEncode(tlsBytes, tlsPrivKey)

	serverCert, err := tls.X509KeyPair(tlsPEM.Bytes(), tlsPrivKeyPEM.Bytes())
	return &serverCert, nil

}

var caBytes []byte
var caCert *x509.Certificate
var caPrivKey *rsa.PrivateKey

func main() {
	var err error
	caBytes, caCert, caPrivKey, err = loadCert("certs/ca")
	if err != nil {
		fmt.Println("Error loading CA: ", err)
		fmt.Println("Generating neq")
		caCert, caPrivKey, err = createCert(true, nil, nil)
		if err != nil {
			fmt.Println(err)
			return
		}
		caBytes, err = signCert(caCert, caCert, caPrivKey, caPrivKey)
		if err != nil {
			fmt.Println(err)
			return
		}
	}

	caPEM, caPrivKeyPEM := pemEncode(caBytes, caPrivKey)
	saveCert(caPEM, caPrivKeyPEM, "certs/ca")

	fmt.Print("Cert loaded \n")
	go sender()

	serverTLSConf := &tls.Config{
		GetCertificate: returnCert,
	}

	ln, err := tls.Listen("tcp", "0.0.0.0:3333", serverTLSConf)
	if err != nil {
		log.Println(err)
		return
	}
	defer ln.Close()

	for {
		conn, err := ln.Accept()
		if err != nil {
			log.Println(err)
			continue
		}
		go handleConnection(conn)
	}

}

func sender() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Disposition",
			"attachment; filename=\"cloverCA.cert.pem\"")
		w.WriteHeader(200)

		caPEM, _ := pemEncode(caBytes, caPrivKey)
		w.Write(caPEM.Bytes())
	})
	http.ListenAndServe(":3003", nil)
}

func pass(from net.Conn, to net.Conn, ack chan bool) {
	b := make([]byte, 10240)
	for {
		n, err := from.Read(b)
		if err != nil {
			break
		}
		if n > 0 {
			to.Write(b[:n])
		}
	}
	from.Close()
	to.Close()
	ack <- true
}

func handleConnection(local net.Conn) {
	remote, err := net.Dial("tcp", "127.0.0.1:3000")
	if err != nil {
		local.Close()
		return
	}

	ack := make(chan bool)

	go pass(remote, local, ack)
	go pass(local, remote, ack)

	<-ack
	<-ack

	local.Close()
	remote.Close()

}
