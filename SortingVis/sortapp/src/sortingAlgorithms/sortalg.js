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
