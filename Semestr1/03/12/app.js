const print = delay =>
  setTimeout(() => {
    console.log('Hello World ' + delay);
    print(delay + 1);
}, delay * 1000);

print(1);
