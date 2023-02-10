function runTest(test) {
    // pre: bits should be an array containing only 0 and 1 as a number
    input = document.getElementById("input").value

    let testSuit = new NIST(input);
    var limit = 50;

    if (test == "all") {
        limit = 100;
    }

    if (testSuit.n != limit) {
        alert("Error: input must have 50 digits");
        return 0;
    }

    console.log

    if (test == "runsTest") {
        var Pvalue = testSuit.runsTest();
        document.getElementById("runsP").value = Pvalue
    } else if (test == "freqTest") {
        var Pvalue = testSuit.freqTest();
        document.getElementById("freqP").value = Pvalue
    } else if (test == "csumTest") {
        var Pvalue = testSuit.csumTest();
        document.getElementById("csumP").value = Pvalue
    } else { // run all
        var runsP = testSuit.runsTest();
        var freqP = testSuit.freqTest();
        var DFTP = testSuit.DFTTest();
        var csumP = testSuit.csumTest();
        var templateP = testSuit.templateTest();

        document.getElementById("runsP").value = runsP
        document.getElementById("freqP").value = freqP;
        document.getElementById("DFTP").value = DFTP;
        document.getElementById("csumP").value = csumP;
        document.getElementById("templateP").value = templateP;

        var Pvalue = runsP.toFixed(3) + ", " + freqP.toFixed(3) + ", " + DFTP.toFixed(3) + ", " + csumP.toFixed(3) + ", " + templateP.toFixed(3)
    }

    console.log("Pvalue: " + Pvalue)
    document.getElementById("list").appendChild(createComponent(Pvalue))
};