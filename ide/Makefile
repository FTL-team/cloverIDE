.PHONY: deb logo

OUT_FILES= \
	node_modules/drivelist/build/Release/drivelist.node \
	node_modules/nsfw/build/Release/nsfw.node \
	node_modules/find-git-repositories/build/Release/findGitRepos.node \
	node_modules/@theia/node-pty/build/Release/pty.node \
	node_modules/oniguruma/build/Release/onig_scanner.node \
	plugins \
	package.json \
	proxy \
	main \
	Makefile \


NODE_URL=https://nodejs.org/dist/v12.19.0/node-v12.19.0-linux-x64.tar.xz


deb: logo
		yarn pkg -t node12-linux ./src-gen/backend/main.js
		yarn pkg -t node12-linux ./proxy.js

		mkdir -p deb/opt/cloverextension
		cp -r $(OUT_FILES) deb/opt/cloverextension
		mkdir -p deb/opt/cloverextension/certs
		cp certs/cert.ext deb/opt/cloverextension/certs

		dpkg-deb --build deb                                 

logo:
		rsvg-convert ../logo.svg  -o logo.png --zoom 2
		convert logo.png -crop 200x200+60+60 -resize 64x64 logo.ico
		cp logo.ico lib/favicon.ico
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
	./proxy & THEIA_WEBVIEW_EXTERNAL_ENDPOINT="{{hostname}}" ./main --plugins=local-dir:plugins