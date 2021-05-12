const InsertionSort = (
  n,
  arr,
  addSwap,
  addSelect,
  addCompare,
  addCopy,
  addSet
) => {
  let queue = [];
  for (let i = 1; i < n; i++) {
    let j = i - 1;
    let key = arr[i];
    addCompare(queue, j, key);
    while (j >= 0 && arr[j] > key) {
      addCopy(queue, j, j + 1);
      arr[j + 1] = arr[j];
      --j;
      addCompare(queue, j, key);
    }
    addSet(queue, j + 1, key);
    arr[j + 1] = key;
  }
  console.log(arr);
  return queue;
};

export default InsertionSort;
