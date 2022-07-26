const fs = require("fs");
const isImage = require("./isImage");

class Dir
{
    constructor(root, path)
    {
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
        // console.log("shit", root, path);
        try {
            fs.readdirSync(path, { withFileTypes: true }).forEach(entry => {
                // console.log(entry);
                if (entry.isFile()) {
                    if (isImage(entry.name)) {
                        this.images.push(entry.name);
                    } else if (this.root && entry.name.endsWith(".url")) {
                        this.bookmarks = true;
                    }
                } else if (entry.isDirectory()) {
                    // console.log("got dir", entry.name);
                    this.dirs.push(entry.name);
                }
            });
        } catch (err) {
            console.error("Balls", err);
        }
    }
};

module.exports = Dir;
