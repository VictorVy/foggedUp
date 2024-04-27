const filesDiv = document.getElementById("files");

function createItemWrapper(item) {
    let name = document.createElement("p");
    name.innerText = item.name;

    let isDir = document.createElement("p");
    isDir.innerText = item.isDir;

    let div = document.createElement("div");
    div.className = "item-wrapper";
    div.appendChild(name);
    div.appendChild(isDir);

    return div;
}

fetch("/files?path=" + location.pathname).then((res) => {
    return res.json();
}).then((data) => {
    data.forEach((item) => {        
        filesDiv.appendChild(createItemWrapper(item));
    });
});
