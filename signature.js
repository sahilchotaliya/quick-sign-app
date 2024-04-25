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
        drawing = true;
        if (e.touches) {
            var rect = canvas.getBoundingClientRect();
            lastX = e.touches[0].clientX - rect.left;
            lastY = e.touches[0].clientY - rect.top;
        } else {
            lastX = e.offsetX;
            lastY = e.offsetY;
        }
    }

    function draw(e) {
        if (!drawing) return;
        e.preventDefault();
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        if (e.touches) {
            var rect = canvas.getBoundingClientRect();
            var currentX = e.touches[0].clientX - rect.left;
            var currentY = e.touches[0].clientY - rect.top;
        } else {
            var currentX = e.offsetX;
            var currentY = e.offsetY;
        }
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = colorSelect.value;
        ctx.lineWidth = sizeSelect.value;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        lastX = currentX;
        lastY = currentY;
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
