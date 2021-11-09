var buildMode = true;
function Build(scene) {
    this.scene = scene;
    //this.applyBlockGrid();
    //this.placeBlock();
    this.box = BABYLON.Mesh.CreateBox("placeBlock",10,scene);
    this.box.position.y = camera.position.y;
    this.box.isPickable = false;
    var boxMat = new BABYLON.StandardMaterial("boxMat",scene);
    //boxMat.wireframe = true;
    boxMat.diffuseColor = BABYLON.Color3.Black();
    boxMat.alpha = 0.3;
    this.box.material = boxMat;
    var bn = 0;
    var _this = this;
    this.bBox = BABYLON.Mesh.CreateBox("bBox",100,scene);
    scene.onPointerDown = function(evt) {
        if(buildMode && evt.button == 2) {
            var pickInfo = scene.pick(681,385);
            if(pickInfo.hit ) {
                var BOX = pickInfo.pickedMesh.name;
                if(BOX.indexOf("newBox") >-1) {
                    pickInfo.pickedMesh.dispose();
                }
            }
        }
    }
    this.bBox.actionManager = new BABYLON.ActionManager(scene);
    var firstBlock = true;
    var originalBlock;
    this.bBox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function () {
        if(buildMode) {
            bn++;
            var newBox;
            if(firstBlock) {
                newBox = BABYLON.Mesh.CreateBox("newBox"+bn,10,scene);
                originalBlock = newBox;
                firstBlock = false;
            }else {
                newBox = originalBlock.clone("newBox"+bn);
            }
            newBox.position = new BABYLON.Vector3(_this.box.position.x,
                                                        _this.box.position.y,
                                                        _this.box.position.z);
            var nbm = new BABYLON.StandardMaterial("nbm"+bn,scene);
            nbm.diffuseTexture = new BABYLON.Texture("textures/grass.png",scene);
            newBox.material = nbm;
        }
    }));
}//cause error to speed up cpu;
Build.prototype.findPoint = function() {
    var _this = this;
    this.bBox.position = new BABYLON.Vector3(camera.position.x,camera.position.y-15,camera.position.z);

    var pickInfo = this.scene.pick(681,385);
    if(pickInfo.hit) {
        setTimeout(function() {
            //_this.box.position = new BABYLON.Vector3(Math.round((pickInfo.pickedPoint.x)/10)*10,
            //                                Math.round((pickInfo.pickedPoint.y)/10)*10,
            //                                Math.round((pickInfo.pickedPoint.z)/10)*10); 
        },10);
    }
}
