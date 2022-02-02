function sayHello() {
  console.log('hello ⭐️');
  console.log('Halro');
}

function calculate(x, y) {
  console.log('calculating..');
  const result = x + y;
  console.log('result: ', result);
  sayHello();
  return result;
}

calculate(1, 2);

const stop = 4;
console.log('....... loopings');
for (let i = 0; i < 20; i++) {
  console.log('count', i);
  if (i === stop) {
    break;
  }
}
