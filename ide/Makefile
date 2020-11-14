.PHONY: deb logo

OUT_FILES= \
	node_modules/drivelist/build/Release/drivelist.node \
	node_modules/nsfw/build/Release/nsfw.node \
	node_modules/find-git-repositories/build/Release/findGitRepos.node \
	node_modules/@theia/node-pty/build/Release/pty.node \
	node_modules/oniguruma/build/Release/onig_scanner.node \
	package.json \
	main \
	Makefile \

package: logo
		rm -rf out
		mkdir out
		yarn pkg -t node12-linux ./src-gen/backend/main.js
		cp $(OUT_FILES) out                               

logo:
		rsvg-convert ../logo.svg  -o logo.png --zoom 2
		convert logo.png -crop 200x200+60+60 -resize 64x64 lib/logo.ico

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
	./proxy & THEIA_WEBVIEW_EXTERNAL_ENDPOINT="{{hostname}}" ./main --plugins=local-dir:plugins