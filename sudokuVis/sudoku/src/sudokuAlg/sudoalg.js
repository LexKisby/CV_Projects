export function backTrack(seedarr, array) {
  //9x9 array.
  const OGnums = seedarr.slice();
  array = seedarr.slice();
  var i = 0;
  var j = 0;
  var k = 0;
  var solved = false;
  var comparisons = 0;
  while (solved === false) {
    console.log(comparisons++);
    [i, j] = Next(array, i, j);

    if (i === false) {
      solved = true;
      continue;
    }
    k = look(array, i, j) + 1;
    var testing;
    var backtracking;
    if (k > 9) {
      testing = false;
      backtracking = true;
    } else {
      testing = true;
      backtracking = false;
    }
    while (testing) {
      console.log(k, j, comparisons++);
      testing = test(array, i, j, k);
      if (k === 9 && testing === true) {
        testing = false;
        backtracking = true;
      } else if (testing === false) {
        array[i][j] = k;
      } else {
        k++;
      }
    }
    if (backtracking) {
      array[i][j] = 0;
      [i, j] = Prev(array, OGnums, i, j);
      if (i === -1) {
        return array;
      }
    }
  }
  return array;
}
function test(array, i, j, k) {
  array[i][j] = 0;
  for (var element of array[i]) {
    if (element === k) {
      return true;
    }
  }
  for (let x = 0; x < 9; x++) {
    if (array[x][j] === k) {
      return true;
    }
  }
  const square = [];
  var a = Math.floor(i / 3) * 3;
  var b = Math.floor(j / 3) * 3;
  for (let x = a; x < a + 3; x++) {
    for (let y = b; y < b + 3; y++) {
      square.push(array[x][y]);
    }
  }
  console.log("square", square);
  for (const num of square) {
    if (k === num) {
      return true;
    }
  }
  return false;
}

function Prev(array, OG, i, j) {
  var found = false;
  while (found === false) {
    [i, j] = state(-1, i, j);
    console.log("prevstate");
    if (i === -1) {
      console.log("problemo");
      return [-1, false];
    }
    found = isZeroOG(OG, i, j);
    console.log(found);
  }
  return [i, j];
}

function isZeroOG(OG, i, j) {
  if (look(OG, i, j) === 0) {
    return true;
  }
  return false;
}

function Next(array, i, j) {
  var found = isZero(array, i, j);
  while (found === false) {
    [i, j] = state(1, i, j);
    if (i === -1) {
      return [false, false];
    }
    found = isZero(array, i, j);
  }
  return [i, j];
}

function isZero(array, i, j) {
  if (look(array, i, j) === 0) {
    return true;
  }
  return false;
}

function look(array, i, j) {
  return array[i][j];
}

function state(n, i, j) {
  if (n === -1) {
    //go down
    if (j > 0) {
      j--;
    } else {
      if (i > 0) {
        i--;
        j = 8;
      } else {
        return [-1, -1];
      }
    }
  } else {
    //go up
    if (j < 8) {
      j++;
    } else {
      if (i < 8) {
        i++;
        j = 0;
      } else {
        return [-1, -1];
      }
    }
  }
  return [i, j];
}
