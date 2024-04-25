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

    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
    });

    canvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = colorSelect.value;
            ctx.lineWidth = sizeSelect.value;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
            lastX = e.offsetX;
            lastY = e.offsetY;
        }
    });

    canvas.addEventListener('mouseup', function () {
        drawing = false;
    });

    canvas.addEventListener('mouseleave', function () {
        drawing = false;
    });

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
  