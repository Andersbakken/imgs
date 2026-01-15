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

function isVideo(fp)
{
    switch (path.extname(fp).toLowerCase()) {
    case ".mp4":
    case ".webm":
    case ".mov":
    case ".m4v":
    case ".mkv":
    case ".avi":
    case ".mpg":
    case ".mpeg":
    case ".wmv":
    case ".flv":
    case ".rm":
    case ".rmvb":
    case ".3gp":
    case ".ogv":
        return true;
    }
    return false;
}

function isMedia(fp)
{
    return isImage(fp) || isVideo(fp);
}

module.exports = isImage;
module.exports.isImage = isImage;
module.exports.isVideo = isVideo;
module.exports.isMedia = isMedia;
