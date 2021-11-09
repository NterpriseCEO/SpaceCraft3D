function createHeightMap(size,chunksX,chunksY) {
    var canvas = document.getElementById('canvas2');
    canvas.width = size||1024;
    canvas.height = size||1024;
    var ctx = canvas.getContext('2d');
    var image = ctx.createImageData(canvas.width, canvas.height);
    var data = image.data;
    var total = 0;
    var frequency = 1;
    //noise.seed(Math.random());
    for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
            var value = 0.7*Math.abs(noise.perlin2(x/800, y/800))
                        +0.5*Math.abs(noise.simplex2(x/400, y/400))
                        +0.25* Math.abs(noise.simplex2(x/200, y/200))
                        +0.125* Math.abs(noise.simplex2(x/100, y/100))
                        +0.0625* Math.abs(noise.simplex2(x/50, y/50))
                        +0.03125* Math.abs(noise.simplex2(x/25, y/25))
                        +0.03125* Math.abs(noise.simplex2(x/12.5, y/12.5));
            value = Math.floor(value * 256)
            value = Math.pow(value,1);
            var cell = (x + y * canvas.width) * 4;
            data[cell] = data[cell + 1] = data[cell + 2] = value;
            data[cell + 3] = 255; // alpha.
        }
    }
    var canvas2 = document.createElement("canvas");
    var img = new Image();
    img.data = image;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(img.data,0,0);
    return canvas.toDataURL();
}
