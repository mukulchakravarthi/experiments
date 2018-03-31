(function() {
  var video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas');
  navigator.getMedia = navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;
  navigator.getMedia({video: true,audio: false}, function(stream) {
    if (navigator.mozGetUserMedia) {
      video.mozSrcObject = stream;
    } else {
      var vendorURL = window.URL || window.webkitURL;
      video.src = vendorURL.createObjectURL(stream);
    }
    video.play();
  }, function(err) {console.log("An error occured! " + err);});
})()

setInterval(function(){  
  var width = 800;
  var height = 600;
  var offset = 8;

  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, width, height);
  var data = ctx.getImageData(0,0,width,height).data;
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height)
  ctx.fillStyle = 'white';
  for(var x = 0; x < canvas.width; x += offset){
    for(var y = 0; y < canvas.height; y += offset){
      var r = y * (canvas.width * 4) + (x * 4);
      var avg = Math.ceil((data[r++] + data[r++] + data[r++]) / 3);
      var width = avg/255 * offset;
      var d = (offset - width)/2

      ctx.fillRect(x + d, y + d, width, width);
    }
  }
}, 1000/60)