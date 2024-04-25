document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('signature-pad');
    var ctx = canvas.getContext('2d');
    var clearButton = document.getElementById('clear-btn');
    var downloadButton = document.getElementById('download-btn');
    var sizeSelect = document.getElementById('size-select');
    var colorSelect = document.getElementById('color-select');
    var drawing = false;
    var lastX = 0;
    var lastY = 0;
  
    function startPosition(e) {
        e.preventDefault();
        drawing = true;
        if (e.touches) {
          const rect = canvas.getBoundingClientRect();
          const touch = e.touches[0];
          lastX = (touch.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
          lastY = (touch.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        } else {
          lastX = e.offsetX || e.clientX - canvas.offsetLeft;
          lastY = e.offsetY || e.clientY - canvas.offsetTop;
        }
      }
      
      function draw(e) {
        if (!drawing) return;
        e.preventDefault();
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
      
        if (e.touches) {
          const rect = canvas.getBoundingClientRect();
          for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            const currentX = (touch.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
            const currentY = (touch.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
            ctx.lineTo(currentX, currentY);
            lastX = currentX;
            lastY = currentY;
          }
        } else {
          const currentX = e.offsetX || e.clientX - canvas.offsetLeft;
          const currentY = e.offsetY || e.clientY - canvas.offsetTop;
          ctx.lineTo(currentX, currentY);
          lastX = currentX;
          lastY = currentY;
        }
      
        ctx.strokeStyle = colorSelect.value;
        ctx.lineWidth = sizeSelect.value;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    function endPosition() {
      drawing = false;
    }
  
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mouseleave', endPosition);
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchcancel', endPosition);
  
    clearButton.addEventListener('click', function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    downloadButton.addEventListener('click', function () {
      var image = canvas.toDataURL('image/png');
      var link = document.createElement('a');
      link.download = 'signature.png';
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });