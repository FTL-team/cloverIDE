ROOT = deb/opt/advancedClover
PY = deb/usr/lib/python2.7/dist-packages
IDE = $(ROOT)/ide

DIRS_CREATE = \
	$(PY) \
	$(ROOT) \
	$(IDE)

package:
		rm -rf deb/opt
		rm -rf deb/usr
		mkdir -p $(DIRS_CREATE)

		unzip ../ide.zip -d $(IDE)
		mv $(IDE)/out/* $(IDE)
		rm -rf $(IDE)/out

		cp ../ideHttpsProxy $(IDE)
		chmod +x $(IDE)/ideHttpsProxy

		unzip -q ../idePlugins.zip -d $(IDE)

		cp -r ../pylib $(PY)/advancedClover

		mkdir $(IDE)/certs
		chmod a+rw $(IDE)/certs

		dpkg-deb --build deb
		cp deb.deb ../advancedClover.deb  