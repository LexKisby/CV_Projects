export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    const animation = {};
    animation.comparison = [i, j];
    if (auxArray[i] <= auxArray[j]) {
      animation.write = [k, auxArray[i]];
      mainArray[k++] = auxArray[i++];
    } else {
      animation.write = [k, auxArray[j]];
      mainArray[k++] = auxArray[j++];
    }
    animations.push(animation);
  }
  while (i <= middleIdx) {
    animations.push({
      comparison: [i, i],
      write: [k, auxArray[i]]
    });
    mainArray[k++] = auxArray[i++];
  }
  while (j <= endIdx) {
    animations.push({
      comparison: [j, j],
      write: [k, auxArray[j]]
    });
    mainArray[k++] = auxArray[j++];
  }
}

export function bubbleSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  var n = array.length;
  var newn = 0;
  while (n > 0) {
    newn = 0;
    for (let i = 1; i < n; i++) {
      if (array[i - 1] > array[i]) {
        swap(array, i - 1, i);
        animations.push({
          comparison: [i - 1, i],
          swap: [i - 1, array[i], i, array[i - 1]]
        });
        newn = i;
      } else {
        animations.push({
          comparison: [i - 1, i],
          swap: [i, array[i], i, array[i]]
        });
      }
    }
    n = newn;
  }
  return animations;
}

function swap(array, IdxOne, IdxTwo) {
  var temp = array[IdxTwo];
  array[IdxTwo] = array[IdxOne];
  array[IdxOne] = temp;
}
