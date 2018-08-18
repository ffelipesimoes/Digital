function check_wallet_balance() {
    //function to get the query string
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    //--------------------------------------


    var hash = getParameterByName('hash_result');
    var request = new XMLHttpRequest();
    var wallet = document.getElementById("newwallet").value;
    var Pkey = document.getElementById("pkey").value;



    request.open('GET', 'https://api.blockcypher.com/v1/btc/test3/addrs/' + wallet, true);
    request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            if (data.balance > 0.00002500) {
                console.log('SALDO OK')
                console.log("Wallet: " + wallet);
                console.log("PKey: " + Pkey)
                console.log("hash: " + hash)

                var privateKey = new bitcore.PrivateKey(Pkey);
                var utxo = {
                    "txId": "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
                    "outputIndex": 0,
                    "address": wallet,
                    "script": "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
                    "satoshis": 50000
                };

                var transaction = new bitcore.Transaction()
                    .from(utxo)
                    .addData(hash) // Add OP_RETURN data
                    .sign(privateKey);
                console.log("deu certo")    

            }

            else {
                console.log('Saldo insuficiente')
            }

        } else {
            console.log('error');
        }
    }

    request.send();



}