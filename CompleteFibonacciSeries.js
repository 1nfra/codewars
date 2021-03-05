function fibonacci(n) {
  if (n <= 0) {
    return [];
  }
  let a = 0;
  let b = 1;
  let arr = [];
  while (n) {
    arr.push(a);
    n--;
    [a,b]=[b,a];
    b = a + b;
  }
  return arr;
}
