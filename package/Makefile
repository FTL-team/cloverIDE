ROOT = deb/opt/advancedClover
IDE = $(ROOT)/ide

DIRS_CREATE = \
	$(ROOT) \
	$(IDE)

package:
		rm -rf deb/opt
		rm -rf deb/usr
		mkdir -p $(DIRS_CREATE)

		cp ../ide/cloveride $(IDE)
		cp ../ide/node_modules/drivelist/build/Release/drivelist.node $(IDE)
		cp -r ../ide/plugins $(IDE)

		dpkg-deb --build deb
		cp deb.deb ../advancedClover.deb  