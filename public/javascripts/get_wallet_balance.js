function get_wallet_balance () {
    var request = new XMLHttpRequest();
    var wallet = document.getElementById("wallet_address").value;
    //console.log(transaction)
    
    //var transaction = 'f854aebae95150b379cc1187d848d58225f3c4157fe992bcd166f58bd5063449'
    request.open('GET', 'https://api.blockcypher.com/v1/btc/main/addrs/'+ wallet, true);
    request.onload = function () {

         // Begin accessing JSON data here
        var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) 
                {
                    
                    document.getElementById("wallet_received").value = (data.total_received / 100000000).toFixed(8);
                    document.getElementById("wallet_sent").value = (data.total_sent / 100000000).toFixed(8);
                    document.getElementById("wallet_balance").value = (data.balance / 100000000).toFixed(8);
                    
                } else 
                {
                    console.log('error');
                }
        }

     request.send();
       
 }

