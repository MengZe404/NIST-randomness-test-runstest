// https://stackoverflow.com/questions/22079340/how-do-you-create-a-function-that-performs-sigma-notation-calculations-in-javasc#22079425
function sigma(start, end, modifier) {
  const length = end - start + 1;
  const map = (v, k) => modifier ? modifier(k + start) : k + start;
  const sum = (a, b) => a + b;

  return Array.from({
    length
  }, map).reduce(sum);
}

function cdfNormal(x, mean = 0, standardDeviation = 1) {
  return (1 - math.erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2
}

// reference: https://github.com/ycmjason/nist-randomness-test-suite/blob/master/lib/utils/range.js
function range(start, stop, step) {
  // usage:
  //   range(5) => [0, 1, 2, 3, 4]
  //   range(3, 6) => [3, 4, 5]
  //   range(0, 11, 2) => [0, 2, 4, 6, 8, 10]
  if (!stop && stop !== 0) {
    stop = start;
    start = 0;
  }
  step = step || 1;
  var ret = [];
  for (var i = start; i < stop; i += step) {
    ret.push(i);
  }
  return ret;
};


// Complementary Error Function
function erfc(x) {
  return 1 - math.erf(x);
}

function countOccurrencesOf(block, template) {
  var count = 0;
  for (let i = 0; i < block.length; i++) {
    var window_ = block.slice(i, i + template.length).join('');
    if (window_.length != template.length) break;
    if (window_ === template) {
      count++;
      i += template.length;
    }
  }
  return count;
}

function romberg_method(f, lower, upper) {
  var ACCURACY = 0.00000000000001;
  // ref: https://en.wikipedia.org/wiki/Romberg%27s_method
  var R = [];

  var h = (upper - lower); //step size
  // R(0, 0)
  R[0] = [(f(lower) + f(upper)) * h * 1 / 2]; //first trapezoidal step

  var n = 0;
  do {
    n += 1;
    R[n] = [];
    h /= 2;

    // calculation of R(n, 0)
    var c = 0;
    for (var k = 1; k <= Math.pow(2, n - 1); ++k) {
      c += f(lower + (2 * k - 1) * h);
    }
    R[n][0] = h * c + R[n - 1][0] * 1 / 2;

    // calculation of R(n, m)
    for (var m = 1; m <= n; ++m) {
      R[n][m] = (Math.pow(4, m) * R[n][m - 1] - R[n - 1][m - 1]) / (Math.pow(4, m) - 1);
    }

  } while (Math.abs(R[n - 1][n - 1] - R[n][n]) > ACCURACY);

  return R[n][n];
}


function igamc(a, x) {
  // Complemented Incomplete Gamma Function
  var lower_incomplete_gamma = function (s, x) {
    console.log("1")
    //  Calculate the lower incomplete gamma function
    //    ref: https://en.wikipedia.org/wiki/Incomplete_gamma_function
    var f = (t) => Math.pow(t, s - 1) * Math.exp(-t);
    return romberg_method(f, 0, x);
  };

  var upper_incomplete_gamma = function (s, x) {
    // ref: https://en.wikipedia.org/wiki/Incomplete_gamma_function#Properties
    return math.gamma(s) - lower_incomplete_gamma(s, x);
  };

  return upper_incomplete_gamma(a, x) / math.gamma(a);
};