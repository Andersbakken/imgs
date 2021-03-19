const path = require("path");

function isImage(fp)
{
    // console.log(path.extname(fp));
    switch (path.extname(fp).toLowerCase()) {
    case ".png":
    case ".jpg":
    case ".jpeg":
    case ".gif":
        return true;
    }
    return false;
}

module.exports = isImage;
