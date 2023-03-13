ROOT = deb/opt/cloverIde

DIRS_CREATE = \
	$(ROOT) 

package:
		rm -rf deb/opt
		rm -rf deb/usr

		mkdir deb/opt/

		cp -r ../ide $(ROOT)
		cp ../cloverExtension.vsix $(ROOT)/plugins

		mkdir -p deb/lib/systemd/system
		cp ./cloveride.service deb/lib/systemd/system

		dpkg-deb --build deb
		cp deb.deb ../advancedClover.deb  