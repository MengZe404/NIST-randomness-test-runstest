// reference: 
// Bassham, L.E. et al. (2010) “A statistical test suite for random and pseudorandom number generators for cryptographic applications.” 
// Available at: https://doi.org/10.6028/nist.sp.800-22r1a. 

class NIST {
    constructor(input) {
        this.input = input;
        this.bits = input.split("").map(Number);
        this.n = this.bits.length;

        for (var i of this.bits) {
            if (i !== 0 && i !== 1) {
                alert("Error: input must contain 0s and 1s only");
                return 0;
            }
        }
    }


    runsTest() {
        if (this.freqTest() < 0.01) {
            return 0;
        }

        var pi = this.bits.reduce((a, b) => a + b) / this.n;

        var r = (_, k) => this.bits[k] == this.bits[k + 1] ? 0 : 1;
        var s = math.sum(this.bits.map(r));

        var runsP = erfc(math.abs(s - 2 * this.n * pi * (1 - pi)) / (2 * Math.sqrt(2 * this.n) * pi * (1 - pi)));

        return runsP;
    }

    freqTest() {
        var Sn = Math.abs(this.bits.reduce((a, b) => a + b) - (this.n - this.bits.reduce((a, b) => a + b)));
        var Sobs = Sn / Math.sqrt(this.n);

        var freqP = erfc(Sobs / Math.sqrt(2));

        return freqP;
    }

    DFTTest() {
        var S = fourier.dft(this.bits.map(element => element === 0 ? -1 : element), Array.from({
            length: this.n
        }, () => 0));

        var M = [];

        // only take the quotient of the division
        for (var i = 0; i < ~~(this.n / 2); i++) {
            var real = S[0][i];
            var img = S[1][i];

            M.push(Math.sqrt((Math.pow(real, 2) + Math.pow(img, 2))));
        }

        var T = Math.sqrt(Math.log(20) * this.n);

        var N0 = 0.95 * ~~(this.n / 2);

        var N1 = 0;

        for (var j = 0; j < this.n / 2; j++) {
            if (M[j] < T) {
                N1 = N1 + 1;
            } else {
                console.log("M[" + j + "]: " + M[j]);
            }
        }

        var d = (N1 - N0) / Math.sqrt(this.n * (0.95) * (0.05) / 4);

        var DFTP = erfc(Math.abs(d) / Math.sqrt(2));

        return DFTP;
    }

    csumTest() {
        // process the input: ei = 2ei - 1
        var bits = this.bits.map(element => element === 0 ? -1 : element);
        var n = this.n

        var S = range(1, n + 1).map((i) => math.sum(bits.slice(0, i)));

        var z = math.max(math.abs(S));

        var CSUMP = 1 -
            sigma(Math.ceil((-n / z + 1) / 4), Math.floor((n / z - 1) / 4), k => (
                cdfNormal((4 * k + 1) * z / math.sqrt(n)) -
                cdfNormal((4 * k - 1) * z / math.sqrt(n)))) +
            sigma(Math.ceil((-n / z - 3) / 4), Math.floor((n / z - 1) / 4), k => (
                cdfNormal((4 * k + 3) * z / math.sqrt(n)) -
                cdfNormal((4 * k + 1) * z / math.sqrt(n))));

        console.log(CSUMP)
        return CSUMP;
    }

    templateTest() {
        var n = this.n
        var bits = this.bits

        const NUMBER_OF_BLOCKS = 2;
        const BLOCK_LENGTH = Math.floor(n / NUMBER_OF_BLOCKS);
        const TEMPLATE = "001";

        // divide the bits into 3 blocks, each with 10 bits
        var blocks = range(NUMBER_OF_BLOCKS).map((i) => bits.slice(i * BLOCK_LENGTH, (i + 1) * BLOCK_LENGTH));
        var counts = blocks.map(block => countOccurrencesOf(block, TEMPLATE));

        var m = TEMPLATE.length;
        var N = NUMBER_OF_BLOCKS;
        var M = BLOCK_LENGTH;
        var W = counts; // W = [W1, W2, W3]

        console.log("m: " + m);
        console.log("N: " + N);
        console.log("M: " + M);
        console.log("W: " + W);

        var expected_mean = (M - m + 1) / Math.pow(2, m);
        var expected_variance = M * ((1 / Math.pow(2, m)) - ((2 * m - 1) / (Math.pow(2, 2 * m))))

        var chi2 = math.sum(W.map((w) => Math.pow(w - expected_mean, 2) / expected_variance));

        var templateP = igamc(N / 2, chi2 / 2);

        console.log(templateP)
        return templateP
    }
}