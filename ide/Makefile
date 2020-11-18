.PHONY: deb logo

OUT_FILES= \
	node_modules/drivelist/build/Release/drivelist.node \
	node_modules/nsfw/build/Release/nsfw.node \
	node_modules/find-git-repositories/build/Release/findGitRepos.node \
	node_modules/@theia/node-pty/build/Release/pty.node \
	node_modules/oniguruma/build/Release/onig_scanner.node \
	package.json \
	lib \
	main \
	run.sh \

package: logo
		rm -rf out
		mkdir out
		yarn pkg -t node12-linux ./src-gen/backend/main.js
		cp -r $(OUT_FILES) out                               

logo:
		rsvg-convert ../logo.svg  -o logo.png --zoom 2
		convert logo.png -crop 200x200+60+60 -resize 64x64 lib/logo.ico
