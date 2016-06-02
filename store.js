var storage = require('node-persist');

storage.initSync();

storage.setItem('name', 'yourName');

console.log(storage.getItem('name'));

var batman = {
  first: 'Bruce',
  last: 'Wayne',
  alias: 'Batman'
};

storage.setItem('batman', batman);
console.log(storage.getItem('batman'));