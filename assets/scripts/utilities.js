// var element = document.getElementById("form");
document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        runTest();
    }
});

function updateCount() {
    var bits = document.getElementById("input").value.split("").map(Number);
    var counts = bits.length;
    var ones = bits.reduce((a, b) => a + b);
    var zeros = counts - ones;
    document.getElementById('count').value = "n = " + counts;
    document.getElementById('count01').value = "no. ones = " + ones + "\tno. zeros = " + zeros;
}

function createComponent(text) {
    var div = document.createElement("div")
    div.setAttribute("style", "display: flex; justify-content: space-between;")

    var node1 = document.createElement("button")
    var node2 = document.createElement("button")

    var textnode1 = document.createTextNode(input)
    node1.appendChild(textnode1)

    var textnode2 = document.createTextNode(text)
    node2.appendChild(textnode2)

    node1.setAttribute("type", "button")
    node1.setAttribute("class", "list-group-item list-group-item-action p-3")
    node1.setAttribute("style", "min-width: 46vw; left: 4vw;")


    node2.setAttribute("type", "button")
    node2.setAttribute("class", "list-group-item list-group-item-action p-3")
    node2.setAttribute("style", "min-width: 46vw; right: 4vw;")

    div.appendChild(node1)
    div.appendChild(node2)

    return div;
}