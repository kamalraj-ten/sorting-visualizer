// assume that array is passed by reference
function BubbleSort(n = 0, arr = []) {
  for (let i = 1; i < n; ++i) {
    for (let j = 0; j < n - i; ++j) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        console.log("i", i, "j", j);
      }
    }
  }
  return arr;
}

export default BubbleSort;
