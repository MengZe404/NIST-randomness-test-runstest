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

    // Complementary Error Function
    erfc (x){
        return 1 - math.erf(x);
    }

    runsTest() {
        var pi = this.bits.reduce((a, b) => a + b) / this.n;

        var r = (_, k) => this.bits[k] == this.bits[k+1]? 0: 1;
        var s = math.sum(this.bits.map(r));

        var runsP = this.erfc(math.abs(s - 2 * this.n * pi * (1-pi))/(2 * Math.sqrt(2 * this.n) * pi * (1-pi)));

        return runsP;
    }

    freqTest() {
        var Sn = Math.abs(this.bits.reduce((a, b) => a + b) - (this.n - this.bits.reduce((a, b) => a + b)));
        var Sobs = Sn / Math.sqrt(this.n);

        var freqP = this.erfc(Sobs / Math.sqrt(2));

        return freqP;
    }

    DFTTest() {     
        var S = fourier.dft(this.bits.map(element => element === 0 ? -1 : element), Array.from({ length: this.n }, () => 0));

        var M = [];

        for (var i = 0; i < this.n / 2; i++) {
            var real = S[0][i];
            var img = S[1][i];

            M.push(Math.sqrt((Math.pow(real, 2) + Math.pow(img, 2))));
        }
        
        var T = Math.sqrt(Math.log(20)*this.n);

        var N0 = 0.95 * this.n / 2;

        var N1 = 0;

        for (var j = 0; j < this.n / 2; j++) {
            if (M[j] < T) {
                N1 = N1 + 1;
            } else {
                console.log("M[" + j + "]: " + M[j]);
            }
        }

        var d = (N1 - N0) / Math.sqrt(this.n*(0.95)*(0.05)/4);

        var DFTP = this.erfc(Math.abs(d) / Math.sqrt(2));

        return DFTP;
    }
}