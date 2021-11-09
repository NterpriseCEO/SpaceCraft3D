var planetNo = 0;
function Planet(rad,position,scene) {
    let img = createHeightMap();
    //let img = document.getElementById("image").src//;
    planetNo++;
    this.planet = BABYLON.Mesh.CreateGroundFromHeightMap("planet"+planetNo,img,500000,500000,1000,0,35000,scene,true);
    var _this = this;
    this.canDo = false;
    this.planet.onReady = function() {
        _this.planet.subdivide(30);
        _this.canDo = true;
        _this.planet.convertToFlatShadedMesh();
    }
    this.planet.position.y = position.y;
    this.planet.position.x = position.x;
    this.planet.backfaceCulling = true;

    var terrainMaterial = new BABYLON.TriPlanarMaterial("terrainMaterial"+planetNo,scene);
    terrainMaterial.diffuseTextureX = new BABYLON.Texture("textures/stone2.png", scene);
    terrainMaterial.diffuseTextureZ = new BABYLON.Texture("textures/grass2.png", scene);
    terrainMaterial.diffuseTextureY = new BABYLON.Texture("textures/grass.png", scene);
    terrainMaterial.normalTextureX = new BABYLON.Texture("textures/stonen.png",scene);
    terrainMaterial.normalTextureY = new BABYLON.Texture("textures/grassn.png",scene);
    terrainMaterial.normalTextureZ = terrainMaterial.normalTextureY;
    terrainMaterial.tileSize = 200;
    terrainMaterial.specularPower = 0;
    //this.planet.checkCollisions = true;
    this.planet.material = terrainMaterial;
    //this.planet.convertToFlatShadedMesh();

    waterArray.push(this.planet);
    groundWater(scene);
    this.jump = 0;
    //this.addTrees(scene);
}
Planet.prototype.collidingWithTerrain = function(camera) {
    var ray = new BABYLON.Ray(new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z),new BABYLON.Vector3(0, -1, 0));
    var worldInverse = new BABYLON.Matrix();
    this.planet.getWorldMatrix().invertToRef(worldInverse);
    ray = BABYLON.Ray.Transform(ray, worldInverse);
    var pickInfo = this.planet.intersects(ray);
    if(pickInfo.hit) {
        if(camera.position.y <= pickInfo.pickedPoint.y+50) {
            if(!camera.jumping) {
                camera.position.y = pickInfo.pickedPoint.y+50;
            }
        }
    }
    if(camera.falling && !camera.jumping && camera.canFall) {
        camera.position.y-=10;
    }
    if(camera.position.y <= 13025) {
        camera.position.y = 13025;
    }
    if(camera.jumping) {
        if(camera.position.y < this.jump) {
            camera.position.y+=7;
        }else {
            camera.falling = true;
            camera.jumping = false;
        }
    }else {
        this.jump = camera.position.y+100;
    }
}
