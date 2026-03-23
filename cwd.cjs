const fs = require('fs');
console.log(process.cwd());
console.log(fs.readdirSync('.'));
console.log(fs.readdirSync('./public'));
