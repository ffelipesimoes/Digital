var fs = require('fs');
var crypto = require('crypto');

// the file you want to get the hash    
var file = fs.createReadStream('/bitcoin/nada.txt');
var hash = crypto.createHash('sha256');
hash.setEncoding('hex');

file.on('end', function() {
    hash.end();
    console.log(hash.read()); // the desired sha1sum
});

// read all file and pipe it (write it) to the hash object
file.pipe(hash);