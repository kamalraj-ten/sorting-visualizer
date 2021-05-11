// assume that array is passed by reference
const BubbleSort = (n = 0, arr = [], addSwap, addSelect) => {
  let queue = [];
  for (let i = 1; i < n; ++i) {
    for (let j = 0; j < n - i; ++j) {
      addSelect(queue, j, j + 1);
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        addSwap(queue, j, j + 1);
      }
    }
  }
  console.log("queue from bubbel sort", queue);
  return queue;
};

export default BubbleSort;
