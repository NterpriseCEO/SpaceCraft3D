var waterArray = [];
function groundWater(scene) {
    var water = new BABYLON.Mesh.CreateGround("water",500000,500000,32,scene);
    water.position.y = 13000;
    water.convertToFlatShadedMesh();
    var waterMaterial = new BABYLON.WaterMaterial("waterMaterial",scene);
    waterMaterial.backFaceCulling = false;
    waterMaterial.bumpTexture = new BABYLON.Texture("textures/waterBump.png",scene);
    waterMaterial.windForce = 1;
    waterMaterial.waveLength = 0.005;
    waterMaterial.waterColor = new BABYLON.Color3(0,0.5,1);
    water.material = waterMaterial;
    for(var i = 0; i <waterArray.length;i++) {
        waterMaterial.addToRenderList(waterArray[i]);
    }

}
