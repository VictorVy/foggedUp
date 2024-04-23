const filesDiv = document.getElementById("files");

fetch("/files").then((res) => {
    return res.json();
}).then((data) => {
    data.forEach((itemName, index) => {
        let div = document.createElement("div");
        div.className = "item";
        div.innerText = itemName;
        filesDiv.appendChild(div);
    });
});