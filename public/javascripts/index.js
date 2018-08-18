'use strict';

$(document).ready(function() {
  
  var upload_form = $('#upload_form');
  var dropbox = $('.dropbox');
  var html5 = window.File && window.FileReader && window.FileList && window.Blob;
  
  var handleFileSelect = function(f) {
    if (!html5) {
      return;
    }
    
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      setTimeout(function() {
        CryptoJS.SHA256(data, crypto_callback, crypto_finish);
      }, 200);
    };
    reader.readAsBinaryString(f);
    
  };
  if (!html5) {
    upload_form.show();
  } else {
    dropbox.show();
    dropbox.filedrop({
      callback: handleFileSelect
    });
    dropbox.click(function() {
      $('#file').click();
    });
  }
    var crypto_callback = function(p) {
  };

  var crypto_finish = function(hash) {
    document.getElementById("hash_result").value = hash;
    };

  document.getElementById('file').addEventListener('change', function(evt) {
    var f = evt.target.files[0];
    handleFileSelect(f);
  }, false);
});
