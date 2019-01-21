const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname,"../contracts","UsersContract.sol");;
const source = fs.readFileSync(contractPath,"utf8");

console.log(source);