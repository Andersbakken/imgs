const fs = require("fs");
const { isMedia } = require("./media");

class Dir
{
    constructor(root, path, logFn)
    {
        const log = logFn || (() => {});
        // console.log("CRAP", path);
        if (path[path.length - 1] !== "/") {
            path += "/";
        }
        this.path = path;
        this.images = [];
        this.dirs = [];
        this.bookmarks = false;
        if (path !== root) {
            this.dirs.push("..");
            this.relative = path.substr(root.length - 1);
            this.root = false;
        } else {
            this.root = true;
            this.relative = "/";
        }
        log('Scanning directory:', path);
        try {
            const entries = fs.readdirSync(path, { withFileTypes: true });
            log('Found', entries.length, 'entries');
            entries.forEach(entry => {
                if (entry.isFile()) {
                    const media = isMedia(entry.name);
                    log('  File:', entry.name, '- isMedia:', media);
                    if (media) {
                        this.images.push(entry.name);
                    } else if (this.root && entry.name.endsWith(".url")) {
                        this.bookmarks = true;
                    }
                } else if (entry.isDirectory() && entry.name !== '.thumbs') {
                    log('  Dir:', entry.name);
                    this.dirs.push(entry.name);
                }
            });
            log('Result:', this.images.length, 'media files,', this.dirs.length, 'dirs');
        } catch (err) {
            console.error("Error reading directory:", err);
        }
    }
};

module.exports = Dir;
