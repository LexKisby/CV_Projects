const seeds = [
  [
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "c", ".", ".", ".", ".", "a", "f", "."],
    [".", "f", "g", ".", "c", "e", ".", ".", "d"],
    ["f", ".", "h", "a", "b", ".", "i", ".", "."],
    [".", "i", ".", ".", "h", ".", ".", "c", "."],
    [".", ".", "b", ".", "g", "i", "h", ".", "f"],
    ["h", ".", ".", "f", "i", ".", "c", "e", "."],
    [".", "b", "f", ".", ".", ".", ".", "i", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."]
  ],

  [
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "c", ".", "h", "e"],
    [".", ".", "a", ".", "b", ".", ".", ".", "."],
    [".", ".", ".", "b", ".", "g", ".", ".", "."],
    [".", ".", "d", ".", ".", ".", "a", ".", "."],
    [".", "i", ".", ".", ".", ".", ".", ".", "."],
    ["e", ".", ".", ".", ".", ".", ".", "g", "c"],
    [".", ".", "b", ".", "a", ".", ".", ".", "."],
    [".", ".", ".", ".", "d", ".", ".", ".", "i"]
  ]
];

export function getPuzz() {
  const idx = Math.floor(Math.random() * seeds.length);
  var seed = seeds[idx].slice();
  flip(seed);
  seed = rotate(seed);
  populate(seed);
  return seed;
}

function rotate(array) {
  let n = Math.floor(Math.random() * 4);
  for (let i = 0; i < n + 1; i++) {
    array = array[0].map((col, i) => array.map(row => row[i]));
    flip(array);
  }
  return array;
}

function flip(array) {
  let n = array.length;
  for (let i = 0; i < n; i++) {
    array[i].reverse();
  }
}

function populate(seed) {
  var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  var lookup = {
    ".": 0,
    a: array[0],
    b: array[1],
    c: array[2],
    d: array[3],
    e: array[4],
    f: array[5],
    g: array[6],
    h: array[7],
    i: array[8]
  };
  for (var row = 0; row < seed.length; row++) {
    for (var col = 0; col < seed[0].length; col++) {
      seed[row][col] = lookup[seed[row][col]];
    }
  }
  console.log("populated", seed);
}
