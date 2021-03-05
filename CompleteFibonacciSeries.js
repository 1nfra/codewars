// The function 'fibonacci' should return an array of fibonacci numbers.
// The function takes a number as an argument to decide how many no. of elements to produce. 
// If the argument is less than or equal to 0 then return empty array.

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
