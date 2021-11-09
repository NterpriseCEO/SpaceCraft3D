function menus(scene,canvas) {
    var bf = BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Gray());
    var bdrf = BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Black());

    var menuBG = new BABYLON.Rectangle2D({
        id:"menuBG", parent:canvas, x:0, y:0, width:1366.6,height:769, fill:BABYLON.Canvas2D.GetSolidColorBrush(BABYLON.Color3.Purple())
    });
    var unPauseButton = new BABYLON.Rectangle2D({
        id: "unPauseButton", parent: menuBG, x:600, y:500, width:230, height:100,
        fill:bf, border: bdrf,
        children: [
            new BABYLON.Text2D("Return To Game", {
                id: "unPauseButtonT",
                marginAlignment: "h: center, v: center",
                fontName: "22pt Arial"
            })
        ]
    });
    var settingsButton = new BABYLON.Rectangle2D({
        id: "settingsButton", parent: menuBG, x:600, y:380, width:230, height:100,
        fill:bf, border:bdrf, children: [
            new BABYLON.Text2D("Settings", {
                id: "settingsButton",
                marginAlignment: "h: center, v:center",
                fontName: "22pt Arial"
            })
        ]
    });
    var infoBox = new BABYLON.Rectangle2D({
        id: "info", parent: canvas, x:10, y:280, width:585, height:133,
        fill:bf, border:bdrf
    });
    var info1 = new BABYLON.Rectangle2D({
        id: "info1", parent: infoBox, x:2.5, y:3, width:10, height:20,
        children: [
            new BABYLON.Text2D("Left/right arrows - can't desribe in a line, just try it.", {
                id: "info1-2",
                marginAlignment: "h: 0, v:0",
                fontName: "15pt Arial"
            })
        ]
    });
    var info2 = new BABYLON.Rectangle2D({
        id: "info2", parent: infoBox, x:2.5, y:25, width:530, height:20,
        children: [
            new BABYLON.Text2D("WSAD - move.", {
                id: "info2-2",
                marginAlignment: "h: 0, v:0",
                fontName: "15pt Arial"
            })
        ]
    });
    var info3 = new BABYLON.Rectangle2D({
        id: "info3", parent: infoBox, x:2.5, y:48, width:530, height:20,
        children: [
            new BABYLON.Text2D("Space - jump.", {
                id: "info3-2",
                marginAlignment: "h: 0, v:0",
                fontName: "15pt Arial"
            })
        ]
    });
    var info4 = new BABYLON.Rectangle2D({
        id: "info3", parent: infoBox, x:2.5, y:68, width:530, height:20,
        children: [
            new BABYLON.Text2D("Left click - place soil/place block. Right click - mine/remove block.", {
                id: "info3-2",
                marginAlignment: "h: 0, v:0",
                fontName: "15pt Arial"
            })
        ]
    });
    var info4 = new BABYLON.Rectangle2D({
        id: "info3", parent: infoBox, x:2.5, y:88, width:530, height:20,
        children: [
            new BABYLON.Text2D("Tab key - toggle between mining / building.", {
                id: "info3-2",
                marginAlignment: "h: 0, v:0",
                fontName: "15pt Arial"
            })
        ]
    });
    var info4 = new BABYLON.Rectangle2D({
        id: "info3", parent: infoBox, x:2.5, y:108, width:530, height:20,
        children: [
            new BABYLON.Text2D("H to toggle this help pane", {
                id: "info3-2",
                marginAlignment: "h: 0, v: 0",
                fontName: "15pt Arial"
            })
        ]
    });
    var iBLV = true;
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,function(evt) {
        if(evt.sourceEvent.key == "Escape") {
            menuBG.levelVisible = !menuBG.levelVisible;
            if(menuBG.levelVisible) {
                //$("#canvas").removeClass("noCursor");
                engine.isPointerLock = false;
                camera.Cam().detachControl(canvas,false);
                iBLV = infoBox.levelVisible;
                infoBox.levelVisible = true;
            }else {
                //$("#canvas").addClass("noCursor");
                camera.Cam().attachControl(canvas,false);
                scene.activeCamera = camera.Cam();
                engine.isPointerLock = true;
                infoBox.levelVisible = iBLV;
            }
            $("#canvas").toggleClass("noCursor");
            Inventory.invbox().levelVisible = !Inventory.invbox().levelVisible;
        }else if(evt.sourceEvent.key == "h") {
            infoBox.levelVisible = !infoBox.levelVisible;
        }
    }));

    menuBG.levelVisible = false;
    unPauseButton.pointerEventObservable.add(function() {
        menuBG.levelVisible = false;
        infoBox.levelVisible = iBLV;
        Inventory.invbox().levelVisible = !Inventory.invbox().levelVisible;
        $("#canvas").addClass("noCursor");
        camera.Cam().attachControl(canvas,false);
        scene.activeCamera = camera.Cam();
        engine.isPointerLock = true;
    },BABYLON.PrimitivePointerInfo.PointerUp);
}
