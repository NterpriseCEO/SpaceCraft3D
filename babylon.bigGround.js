BABYLON.MeshBuilder.CreatebigGroundFromHeightMap = function (name, url, options, scene) {
    var width = options.width || 10.0;
    var height = options.height || 10.0;
    var subdivisions = options.subdivisions || 1 | 0;
    var minHeight = options.minHeight || 0.0;
    var maxHeight = options.maxHeight || 10.0;

    var mapStartV2 = options.mapStartV2 || BABYLON.Vector2.Zero();

    var updatable = options.updatable;
    var onReady = options.onReady;
    var ground = new BABYLON.GroundMesh(name, scene);
    ground._subdivisions = subdivisions;
    ground._width = width;
    ground._height = height;
    ground._maxX = ground._width / 2.0;
    ground._maxZ = ground._height / 2.0;
    ground._minX = -ground._maxX;
    ground._minZ = -ground._maxZ;
    ground._setReady(false);

    var onload = function (img) {
        // Getting height map data
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");

		canvas.style.padding = "4pt";
		canvas.style.position = "absolute";
		canvas.style.top = "38%";
		canvas.style.left = "60%";
		canvas.style.display = "block";
		canvas.style.zOrder = "0";
		canvas.style.border = "3pt firebrick solid";
		canvas.id = "canvas3";
        
    	var mapEndV2 = options.mapEndV2 || new BABYLON.Vector2(img.width, img.height);

		canvas.width = mapEndV2.x-mapStartV2.x;
		canvas.height = mapEndV2.y-mapStartV2.y;

        var sourceX = mapStartV2.x;
        var sourceY = mapStartV2.y;
        var sourceWidth = mapEndV2.x-mapStartV2.x;
        var sourceHeight = mapEndV2.y-mapStartV2.y;
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var destX = canvas.width / 2 - destWidth / 2;
        var destY = canvas.height / 2 - destHeight / 2;
        
		context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

        // context.drawImage(img, 0, 0);
        // Create VertexData from map data
        // Cast is due to wrong definition in lib.d.ts from ts 1.3 - https://github.com/Microsoft/TypeScript/issues/949

        var buffer = context.getImageData(0,0, destWidth, destHeight).data;

        var vertexData = BABYLON.VertexData.CreateGroundFromHeightMap({
            width: width, height: height,
            subdivisions: subdivisions,
            minHeight: minHeight, maxHeight: maxHeight,
            buffer: buffer, bufferWidth: destWidth, bufferHeight: destHeight
        });
        vertexData.applyToMesh(ground, updatable);
        ground._setReady(true);
        //execute ready callback, if set
        if (onReady) {
            onReady(ground);
        }
    };

    BABYLON.Tools.LoadImage(url, onload, function () { }, scene.database);
    return ground;
};

BABYLON.Mesh.CreatebigGround = function(name,url,rx,ry,tileSize,subdivs,min,max,scene) {
    var imgWidth = 1024;
	var imgHeight = 1024;
	var xSpan = imgWidth/rx;
	var ySpan = imgHeight/ry;
	var cellStart = BABYLON.Vector2.Zero();
	var cellEnd = BABYLON.Vector2.Zero();
	var xOffset = -70;
	var zOffset = 70;
	var ground;
	var tileGap = 0;
	
	for (var row = 0; row < rx; row++) {
		for (var col = 0; col < ry; col++) {
			cellStart.x = col*xSpan;
			cellStart.y = row*ySpan;
			cellEnd.x = (col+1)*xSpan;
			cellEnd.y = (row+1)*ySpan;
			if (col != rx-1) {cellEnd.x +=1}
			if (row != ry-1) {cellEnd.y +=1}

			ground = BABYLON.MeshBuilder.CreatebigGroundFromHeightMap(name+row+"x"+col, 
			url, 
			{
				width: tileSize, 
				height: tileSize, 
				mapStartV2: new BABYLON.Vector2(cellStart.x, cellStart.y),
				mapEndV2: new BABYLON.Vector2(cellEnd.x, cellEnd.y),
				minHeight: min, maxHeight: max,
				subdivisions: subdivs
			},scene);

			ground.material = new BABYLON.StandardMaterial("mat", scene);
			ground.material.diffuseColor = new BABYLON.Color3(0, .4, 0);

			ground.position.x = xOffset + (col*(tileSize + tileGap)); 
			ground.position.z = zOffset - (row * (tileSize + tileGap)); 
            //ground.convertToFlatShadedMesh();
		}
	} 
	
	scene.onDispose = function() {
		//while (document.getElementById("canvas3")) {	 
            //document.getElementById("canvas3").parentNode.removeChild(document.getElementById("canvas3"));
		//}
	}
}