'use strict';

var translate = function(x) {
  return x;
};
var show_message = function(message, type) {
  if (!type) {
    type = 'success';
  }
  $.notify({
    message: message
  }, {
    type: type,
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    }
  });
};

$(document).ready(function() {
  var message = {
    'format': translate('Must select a file to upload'),
    'existing': translate('File already exists in the system. Redirecting...'),
    'added': translate('File successfully added to system. Redirecting...')
  };

  var bar = $('.progress-bar'); //barra de progresso
  var upload_submit = $('#upload_submit');
  var upload_form = $('#upload_form');
  var latest = $('#latest');
  var latest_confirmed = $('#latest_confirmed');
  var explain = $('#explain');
  var progress = $('#hash-progress');
  var dropbox = $('.dropbox');
  var digestLink = $('#digest-link');

  // uncomment this to try non-HTML support:
  //window.File = window.FileReader = window.FileList = window.Blob = null;

  var html5 = window.File && window.FileReader && window.FileList && window.Blob;
  $('#wait').hide();

  var handleFileSelect = function(f) {
    if (!html5) {
      return;
    }
    progress.show();
    digestLink.hide();
    explain.html(translate('Loading document...'));
    var output = '';
    output = translate('Preparing to hash ') + escape(f.name) + ' (' + (f.type || translate('n/a')) + ') - ' + f.size + translate(' bytes, last modified: ') + (f.lastModifiedDate ? f.lastModifiedDate
      .toLocaleDateString() : translate('n/a')) + '';

    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      bar.width(0 + '%');
      bar.addClass('progress-bar-success');
      explain.html(translate('Now hashing... ') + translate('Initializing'));
      setTimeout(function() {
        CryptoJS.SHA256(data, crypto_callback, crypto_finish);
      }, 200);

    };
    reader.onprogress = function(evt) {
      if (evt.lengthComputable) {
        var w = (((evt.loaded / evt.total) * 100).toFixed(2));
        bar.width(w + '%');
      }
    };
    reader.readAsBinaryString(f);
    show_message(output, 'info');
  };
  if (!html5) {
    explain.html(translate('disclaimer'));
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

  // client-side hash
  var onRegisterSuccess = function(json) {
    if (json.success) {
      show_message(vsprintf(message['added'], []), 'success');
    } else {
      show_message(message[json.reason], 'warning');
    }
    if (json.digest) {
      var link = './detail/' + json.digest;
      digestLink.prop("href", link);

      window.setTimeout(function() {
        digestLink.show();
      }, 4500);

      window.setTimeout(function() {
        window.location.href = link;
      }, 5000);
    }
  };

  var crypto_callback = function(p) {
    var w = ((p * 100).toFixed(0));
    bar.width(w + '%');
    explain.html(translate('Now hashing... ') + (w) + '%');
  };

  var crypto_finish = function(hash) {
    bar.width(100 + '%');
    explain.html(translate('O hash do seu documento é: ') + hash);
	//alert(hash);
    $.post('./api/v1/register/' + hash, onRegisterSuccess);
  };


  document.getElementById('file').addEventListener('change', function(evt) {
    var f = evt.target.files[0];
    handleFileSelect(f);
  }, false);

  // upload form (for non-html5 clients)
  upload_submit.click(function() {
    upload_form.ajaxForm({
      dataType: 'json',
      beforeSubmit: function() {
        var percentVal = '0%';
        bar.removeClass('progress-bar-danger');
        bar.removeClass('progress-bar-warning');
        bar.removeClass('progress-bar-success');
        bar.addClass('progress-bar-info');
        bar.width(percentVal);
      },
      uploadProgress: function(event, position, total, percentComplete) {
        var percentVal = percentComplete + '%';
        bar.width(percentVal);
      },
      success: onRegisterSuccess
    });

  });
});
