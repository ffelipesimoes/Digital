//'use strict';
var bitcore = require('bitcore-lib');
function newwallet(){
var pkey = new bitcore.PrivateKey('testnet');
var address = pkey.toAddress();
//console.log("A carteira " + address + " foi criada com sucesso." );
//console.log(pkey );
document.getElementById("newwallet").value = address;
document.getElementById("pkey").value = pkey;
}
