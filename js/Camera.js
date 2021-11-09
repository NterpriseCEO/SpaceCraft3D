function Camera(scene,canvas,UICanvas) {
    var _this = this;
    this.jumping = false;
    this.falling = true;
    this.canFall = true;
    var cam = new BABYLON.FreeCamera("camera",new BABYLON.Vector3(0,0,0),scene);
    cam.attachControl(canvas,true);
    cam.speed = 10;
    cam.maxZ = 200000;
    cam.position.y = 35000;
    cam.keysUp[0] = 87;
    cam.keysDown[0] = 83;
    cam.keysLeft[0] = 65;
    cam.keysRight[0] = 68;

    this.Cam = function() {
        return cam;
    }
    this.position = cam.position;
    var crosshair = new BABYLON.Text2D("+",{
        id: "crosshair",
        parent: UICanvas,
        marginAlignment: "h: center, v: center",
        fontName: "30pt Arial",
    });
    console.log(cam.position.x, cam.position.z);
    /*var texture = new BABYLON.Texture("textures/crosshair2.png", scene, true, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
    texture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
    texture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
    var sprite = new BABYLON.Sprite2D(texture,
        {
            parent: canvas, id: "sprite1", x: 650, y: 358, invertY: true, spriteSize: new BABYLON.Size(64, 64),
            spriteLocation: new BABYLON.Vector2(0, 192-64)
        });
    var timerId = setTimeout(function () {
        sprite.spriteFrame = 1;
    },0);*/
    this.checkBoundries = function() {
        if(cam.position.x>= 249600) {
            cam.position.x = 249600;
        }else if(cam.position.x<= -249600) {
            cam.position.x = -249600;
        }
        if(cam.position.z>= 249600) {
            cam.position.z = 249600;
        }else if(cam.position.z<= -249600) {
            cam.position.z = -249600;
        }
    }
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,function(evt) {
        if(evt.sourceEvent.key == " ") {
            _this.jumping = true
            _this.falling = false;
        }
    }));
}
