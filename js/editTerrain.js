function Mine(scene) {
    var ground = scene.getMeshByName("planet1");
    ground.actionManager = new BABYLON.ActionManager(scene);
    var interval;
    var addGround;
    var blockInterval;
    var _this = this;
    this.grassNum = 0;
    ground.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, function () {
        console.log(buildMode);
        if(buildMode == 3) {
            interval = setInterval(function() {
                var pickResult = scene.pick(681,385);
                var pick = pickResult.pickedPoint;
                _this.editGround(pick.x,pick.z,-1,scene);
            });
            blockInterval = setInterval(function() {
                Inventory.addBlock("grass",1);
            },1000);
        }
    }));
    ground.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
        clearInterval(blockInterval);
        clearInterval(interval);
        clearInterval(addGround);
    }));
    ground.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function () {
        if(buildMode == 3 && canMine) {
            addGround = setInterval(function() {
                var pickResult = scene.pick(681,385);
                var pick = pickResult.pickedPoint;
                _this.editGround(pick.x,pick.z,1,scene);
            });
        }
    }));
}
Mine.prototype.editGround = function(x,z,dir,scene) {
    var ground = scene.getMeshByName("planet1");
    x -= ground.position.x;
    z -= ground.position.z;
    var col = Math.floor((x + ground._maxX) * ground.subdivisions / ground._width);
    var row = Math.floor(-(z + ground._maxZ) * ground.subdivisions / ground._height + ground.subdivisions);

    var i = row * (ground._subdivisions + 1) + col;
    var y1 = i * 3 + 1;
    var y2 = (i + 1) * 3 + 1;
    var y3 = (i + ground._subdivisions + 1) * 3 + 1;
    var changeAltitude = function(positions) {
        if(dir == -1) {
            positions[y1] -= 1;
            positions[y2] -= 1;
            positions[y3] -= 1;
        }else
            positions[y1] += 1;
            positions[y2] += 1;
            positions[y3] += 1;
        }
    ground.updateMeshPositions(changeAltitude);
    ground.updateCoordinateHeights();
    return;
}
