.PHONY: deb logo

OUT_FILES=node_modules lib plugins src-gen package.json proxy.js Makefile
NODE_URL=https://nodejs.org/dist/v12.19.0/node-v12.19.0-linux-x64.tar.xz

deb:
		mkdir -p deb/opt/cloverIDE
		cp -r $(OUT_FILES) deb/opt/cloverIDE
		mkdir -p deb/opt/cloverIDE/certs
		cp certs/cert.ext deb/opt/cloverIDE/certs

		curl https://nodejs.org/dist/v12.19.0/node-v12.19.0-linux-x64.tar.xz -o node.tar.xz
		tar -xvf node.tar.xz
		cp node-v12.19.0-linux-x64/bin/node deb/opt/cloverIDE/
		rm node-v12.19.0-linux-x66 node.tar.gz

		dpkg-deb --build deb                                 

logo:
		rsvg-convert ../logo.svg  -o logo.png --zoom 2
		convert logo.png -crop 200x200+60+60 -resize 64x64 logo.ico
		cp logo.ico code-server/src/browser/media/favicon.ico
		rm logo.ico logo.png

.ONESHELL:
createHttpsCert:
		mkdir certs
		cd certs
		openssl genrsa -out cert.key 2048
		openssl req -new -key cert.key -out cert.csr -subj "/C=BY/ST=Somewhere/L=Somewhere/O=Someone/CN=WOW"
		openssl x509 -req -in cert.csr -CA rootCACert.pem -CAkey rootCAKey.pem -CAcreateserial \
-out cert.crt -days 825 -sha256 -extfile cert.ext

.ONESHELL:
createRootCert:
		mkdir certs
		cd certs
		openssl genrsa -out rootCAKey.pem 2048 
		openssl req -subj "/C=BY/ST=Somewhere/L=Somewhere/O=Someone/CN=WOW"  -x509 -sha256 -new -nodes -key rootCAKey.pem -days 3650 -out rootCACert.pem
		
cert: createRootCert createHttpsCert 

debrun:
	./node ./proxy.js & THEIA_WEBVIEW_EXTERNAL_ENDPOINT="{{hostname}}" ./node ./node_modules/.bin/theia start --plugins=local-dir:plugins