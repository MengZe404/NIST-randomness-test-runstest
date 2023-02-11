function runTest(test) {
    // pre: bits should be an array containing only 0 and 1 as a number
    input = document.getElementById("input").value

    let testSuit = new NIST(input);
    var limit = 50;

    if (test == "all") {
        limit = 100;
    }

    if (testSuit.n != limit) {
        alert("Error: input must have " + limit +  " digits");
        return 0;
    }

    runsResult = document.getElementById("runsP")
    freqResult = document.getElementById("freqP")
    csumResult = document.getElementById("csumP")
    DFTResult = document.getElementById("DFTP")
    templateResult = document.getElementById("templateP")

    if (test == "runsTest") {
        var Pvalue = testSuit.runsTest();
        runsResult.value = Pvalue
    } else if (test == "freqTest") {
        var Pvalue = testSuit.freqTest();
        freqResult.value = Pvalue
    } else if (test == "csumTest") {
        var Pvalue = testSuit.csumTest();
        csumResult.value = Pvalue
    } else { // run all
        var runsP = testSuit.runsTest();
        var freqP = testSuit.freqTest();
        var DFTP = testSuit.DFTTest();
        var csumP = testSuit.csumTest();
        var templateP = testSuit.templateTest();

        var resultFields = [runsResult, freqResult, csumResult, DFTResult, templateResult]
        var pvalues = [runsP, freqP, DFTP, csumP, templateP]

        var total = 0;

        for (i = 0; i < pvalues.length; i++) {
            resultFields[i].value = pvalues[i]
            if (pvalues[i] >= 0.01) {
                resultFields[i].style.background = '#70e46c';
            } else {
                resultFields[i].style.background = '#f29493';
            }
            total += pvalues[i]
        }

        var average = total / pvalues.length
        document.getElementById("average").value = average

        var Pvalue = runsP.toFixed(3) + ", " + freqP.toFixed(3) + ", " + DFTP.toFixed(3) + ", " + csumP.toFixed(3) + ", " + templateP.toFixed(3)
    }

    console.log("Pvalue: " + Pvalue)
    document.getElementById("list").appendChild(createComponent(Pvalue))
};