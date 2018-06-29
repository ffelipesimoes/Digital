var bitcore = require('bitcore-lib');
function getwallet(wallet){
	var wallet = document.getElementById('wallet').value;
   	var address  = bitcore.Address;
    //console.log(wallet, "Is valid?", address.isValid(wallet));
    document.getElementById("wallet_result").value = address.isValid(wallet);
	}