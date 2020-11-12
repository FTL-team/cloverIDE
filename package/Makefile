ROOT = deb/opt/advancedClover
IDE = $(ROOT)/ide

DIRS_CREATE = \
	$(ROOT) \
	$(IDE)

package:
		rm -rf deb/opt
		mkdir -p $(DIRS_CREATE)

		unzip ../ide.zip -d $(IDE)
		mv $(IDE)/out/* $(IDE)
		rm -rf $(IDE)/out

		unzip -q ../idePlugins.zip -d $(IDE)

		dpkg-deb --build deb
		cp deb.deb ../advancedClover.deb  