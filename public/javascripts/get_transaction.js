function get_transaction () {
    var request = new XMLHttpRequest();
    var transaction = document.getElementById("transaction_hash").value;
    //console.log(transaction)
    
    //var transaction = 'f854aebae95150b379cc1187d848d58225f3c4157fe992bcd166f58bd5063449'
    request.open('GET', 'https://api.blockcypher.com/v1/btc/main/txs/'+ transaction, true);
    request.onload = function () {

         // Begin accessing JSON data here
        var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) 
                {
                    
                    document.getElementById("block").value = data.block_height;
                    document.getElementById("hash").value = data.hash;
                    document.getElementById("data").value = data.confirmed;
                    document.getElementById("confirmacoes").value = data.confirmations;
                } else 
                {
                    console.log('error');
                }
        }

     request.send();
       
 }
