function getContentType(requested) {
    let type = requested.split(".")[1];
    switch(type) {
        case "html":
            return "text/html;charset=utf-8";
        case "css":
            return "text/css;charset=utf-8";
        case "js":
            return "text/javascript;charset=utf-8";
        case "ico":
            return "image/x-icon";
        default:
            return "text/plain;charset=utf-8";
    }
}

export { getContentType };