function check_wallet_balance () {
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
    
    
    
    request.open('GET', 'https://api.blockcypher.com/v1/btc/test3/addrs/'+ wallet, true);
    request.onload = function () {

         // Begin accessing JSON data here
        var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400 ) 
                {
                   if (data.balance > 0.00002500) {
                    console.log('SALDO OK')
                    console.log("Wallet: " + wallet);
                    console.log("PKey: " + Pkey)
                    console.log("hash: " + hash)

                    var bitcore_explorers = require('bitcore-explorers');
                    console.log(bitcore_explorers)
                    var Insight = bitcore_explorers.Insight;
                    //var Insight = require('bitcore-explorers').Insight;
                    var Insight = new Insight('testnet');

                    Insight.getUnspentUtxos(wallet, function(err, utxos) {
                        if (err) {
                        // Handle errors...
                            console.log('error getting unspent outputs')
                        } else {
                        // use the UTXOs to create a transaction
                        //console.log(utxos);
                        var tx = bitcore.Transaction();
                        tx.from(utxos);
                        tx.to(wallet, 10000); // .0001 BTC
                        tx.change(wallet); // recommend new address here for better privacy
                        tx.fee(50000);
                        tx.addData('Leticia Simões Eu te amo, by:Felipe Simões')
                        tx.sign(Pkey);

                        tx.serialize();
    

                        // broadcast using bitpay's insight server
                        Insight.broadcast(tx, function(err, returnedTxId) {
                            if (err) {
                            // Handle errors...
                                console.log(err);
                            } else {
                             // Mark the transaction as broadcasted
                            console.log('sucessful broadcast: ' + returnedTxId);
                        }
                    });
                }
            });

                   }else
                   {
                       console.log('Saldo insuficiente')
                   }            

                } else 
                {
                    console.log('error');
                }
        }

     request.send();
       
 }

