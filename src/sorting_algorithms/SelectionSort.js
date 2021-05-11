function SelectionSort(n, arr, addSwap, addSelect) {
  let queue = [];
  for (let i = 0; i < n - 1; ++i) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      addSelect(queue, i, j);
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    // swapping
    const temp = arr[min];
    arr[min] = arr[i];
    arr[i] = temp;
    addSwap(queue, i, min);
  }
  return queue;
}

export default SelectionSort;
