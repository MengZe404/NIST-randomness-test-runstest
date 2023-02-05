function erfc (x){
    // Complementary Error Function
    return 1 - math.erf(x);
};

function runTest(){
    // pre: bits should be an array containing only 0 and 1 as a number
	input = document.getElementById("input").value

	let test = new NIST(input);

	if (test.n != 30) {
		alert("Error: input must have 30 digits");
		return 0;
	}
	
	var runsP = test.runsTest();
	var freqP = test.freqTest();
	var DFTP = test.DFTTest();

	document.getElementById("runsP").value = runsP
	document.getElementById("freqP").value = freqP;
	document.getElementById("DFTP").value = DFTP;

	var div = document.createElement("div")
	div.setAttribute("style", "display: flex; justify-content: space-between;")

    var node1 = document.createElement("button")    
    var node2 = document.createElement("button")         

    var textnode1 = document.createTextNode(input)     
    node1.appendChild(textnode1)
    
    var textnode2 = document.createTextNode(runsP.toFixed(3) + ", " + freqP.toFixed(3) + ", " + DFTP.toFixed(3))     
    node2.appendChild(textnode2)

    node1.setAttribute("type","button")
    node1.setAttribute("class","list-group-item list-group-item-action p-3")
	node1.setAttribute("style", "min-width: 46vw; left: 4vw;")

	
    node2.setAttribute("type","button")
    node2.setAttribute("class","list-group-item list-group-item-action p-3")
	node2.setAttribute("style", "min-width: 46vw; right: 4vw;")

	div.appendChild(node1)
	div.appendChild(node2)

    document.getElementById("list").appendChild(div)
};

function updateCount() {
	var bits = document.getElementById("input").value.split("").map(Number);
	var counts = bits.length;
	var ones = bits.reduce((a, b) => a + b);
	var zeros = counts - ones;
	document.getElementById('count').value = "n = " + counts;
	document.getElementById('count01').value = "no. ones = " + ones + "\tno. zeros = " + zeros;
}


// var element = document.getElementById("form");
document.addEventListener("keypress", function(event) {
	 if (event.key === "Enter") {
		runTest();
     }
});

  