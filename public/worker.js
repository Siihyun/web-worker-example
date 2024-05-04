const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// worker.js
self.onmessage = function (e) {
  let sumResult = 0;
  for (let i = 0; i < 40; i++) {
    sumResult += fibonacci(i);
  }

  postMessage({ result: sumResult });
};
