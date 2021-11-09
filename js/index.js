var earth;
var camera;
var canvas;
var engine;
var earth;
function MainFrame() {
    //Spacecraft Interstellar
    window.onload = function() {
        var pos = document.getElementsByTagName("span")[0];
        canvas = document.getElementById("canvas");
        engine = new BABYLON.Engine(canvas,true);
        var scene = new BABYLON.Scene(engine);

        scene.actionManager = new BABYLON.ActionManager(scene);
        //scene.debugLayer.show();
        var UICanvas = new BABYLON.ScreenSpaceCanvas2D(scene,{
            id: "ScreenCanvas",backgroundFill: "#40404040"
        });

        camera = new Camera(scene,canvas,UICanvas);
        var light = new BABYLON.HemisphericLight("light",new BABYLON.Vector3(0, 1, 0),scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = BABYLON.Color3.Black();

        var skybox = BABYLON.MeshBuilder.CreateSphere("skyBox", {diameter:300000.0}, scene);
        skybox.position = new BABYLON.Vector3(0, 35000, 0);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/TropicalSunnyDay", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        //skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        light.range = 2000;

        earth = new Planet(200000,new BABYLON.Vector3(0,0,0),scene);
        var check = false;
        scene.registerBeforeRender(function() {
            earth.collidingWithTerrain(camera);
            camera.checkBoundries();
            let cam = camera.Cam();
            skybox.position.x = cam.position.x;
            skybox.position.z = cam.position.z;
            skybox.rotation.y+=0.0001;
            if(skybox.rotation.y == 360) {
                skybox.rotation.y = 0;
            }
            skybox.rotation.x+=0.0001;
            if(skybox.rotation.x == 360) {
                skybox.rotation.x = 0;
            }
            pos.innerHTML = camera.position.x+" : "+camera.position.z;
        });
        engine.isPointerLock = true;
        new render(engine,scene);
        check = true;
    }
}
function render(engine,scene) {
    engine.runRenderLoop(function() {
        scene.render();
        //canvas.width = random(canvas.width,canvas.width+10)
    });
}
MainFrame();
