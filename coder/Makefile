
CODER=code-server  --config ./config.yaml --user-data-dir ./userdata --extensions-dir ext

.PHONY: run clean load_data install_ext deb


clean:
		rm -rf ext 
		rm -rf userdata 

load_data: 
		rm -rf userdata
		cp -r data userdata

install_ext: 
		$(CODER) --install-extension ms-python.python
		$(CODER) --install-extension redhat.vscode-xml
		$(CODER) --install-extension dotjoshjohnson.xml
		$(CODER) --install-extension DavidAnson.vscode-markdownlint
		$(CODER) --install-extension ms-vscode.cpptools
		$(CODER) --install-extension ../cloveride/cloveride-*.vsix

build: load_data install_ext
		echo "OK"

run: 
		$(CODER)

deb:
		mkdir -p deb/opt/cloverIDE
		cp -r Makefile config.yaml ext userdata deb/opt/cloverIDE