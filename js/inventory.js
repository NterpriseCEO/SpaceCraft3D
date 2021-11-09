var invPockets = [];
var selectedPos = 0;
var canOpenInventory = true;
var inventoryMax = 5;
function inventory(scene,canvas) {
    var invBox = new BABYLON.Rectangle2D({
       id: "invBox", parent: canvas, x:25, y:25, width:900, height:500/*,fill:BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Gray())*/
    });
    var invPockBox = new BABYLON.Rectangle2D({
       id: "invBox", parent: canvas, x:25, y:25, width:900, height:500/*,fill:BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Gray())*/
    });
    invPockBox.levelVisible = false;
    for(var i = 0; i < 10;i++) {
        var invPock = new BABYLON.Rectangle2D({
            id: "invPock"+i,parent: invBox, x:90*i, width:90, height:90, fill:BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Gray()), border:BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Black())
        });
        invPockets[i] = invPock;
    }
    var box = 9;
    for(var x = 0;x < 10;x++) {
        for(var y = 0; y< 3;y++) {
            box++;
            var invPock = new BABYLON.Rectangle2D({
                id: "invPock"+box, parent:invPockBox, x:90*x, y:90+(90*y), width:90, height:90, fill:BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Gray()),
                border:BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Black())
            });
            invPockets[box] = invPock;
        }
    }
    for(var i = 0; i < invPockets.length; i++) {
        clickPock(i);
    }
    function clickPock(i) {
        invPockets[i].pointerEventObservable.add(function() {
            alert(i);
        },BABYLON.PrimitivePointerInfo.PointerUp);
    }
    var selectedIP = new BABYLON.Rectangle2D({
        id: "sip", parent:invBox, x:0, width:90, height:90,
        border:BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Black()),
        borderThickness:5
    });
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,function(evt) {
        if(evt.sourceEvent.key == "ArrowRight") {
            if(selectedIP.x < 810) {
                selectedPos++;
                selectedIP.x+=90;
            }else {
                selectedPos = 0;
                selectedIP.x = 0;
            }
        }else if(evt.sourceEvent.key == "ArrowLeft") {
            if(selectedIP.x >0) {
                selectedPos--;
                selectedIP.x-=90;
            }else {
                selectedPos = 0;
                selectedIP.x = 810;
            }
        }else if(evt.sourceEvent.key == "e") {
            invPockBox.levelVisible = !invPockBox.levelVisible;
            $("#canvas").toggleClass("noCursor");
        }
    }));

    this.addBlock = function(type,amount,callback) {
        for(var i = 0; i < invPockets.length;i++) {
            var id;
            if(invPockets[i]._children.length >0) {
                id = invPockets[i]._children[0].id;
            }
            if(invPockets[0]._children.length >0) {
            }
            if(invPockets[i]._children.length == 0) {
                var color;
                if(type = "grass") {
                    color = BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Green());
                }
                var block = new BABYLON.Rectangle2D({
                    id: type+amount,parent: invPockets[i], x:10, y:10, width:70, height:70, fill:color
                });
                var amnt = new BABYLON.Rectangle2D({
                    id:type+"_"+amount, parent:block, x:40, y:40,
                    children: [
                        new BABYLON.Text2D(amount.toString(), {
                            id:type+"_amount"+amount,
                            marginAlignment: "h: center, v: center",
                            fontName: "22pt Arial"
                        })
                    ]
                });
                invPockets[i]._children[0]._children[0] = amnt;
                return callback(true);
            }else if(invPockets[i]._children.length == 1 && id.indexOf(type) > -1          && parseInt(invPockets[i]._children[0]
                     ._children[0]._children[0]._text) <inventoryMax) {
                var amntNum = parseInt(invPockets[i]._children[0]._children[0]
                ._children[0]._text)+amount;
                invPockets[i]._children[0]._children[0].dispose();
                var ips = invPockets[i]._children[0];
                var amnt = new BABYLON.Rectangle2D({
                    id:ips.id+"_"+amount, parent:ips, x:40, y:40,
                    children: [
                        new BABYLON.Text2D(amntNum.toString(), {
                            id:ips.id+"_amount"+amntNum,
                            marginAlignment: "h: center, v: center",
                            fontName: "22pt Arial"
                        })
                    ]
                });
                invPockets[i]._children[0]._children[0] = amnt;
                return callback(true);
            }
        }
    }

    this.removeBlock = function(callback) {
        if(invPockets[selectedPos]._children[0] != undefined) {
            if(invPockets[selectedPos]._children[0]._children[0]
            ._children[0]._text) {
                var num = parseInt(invPockets[selectedPos]._children[0]._children[0]
                ._children[0]._text)-1;
            }
            if(num >= 1) {
                num = num.toString();
                invPockets[selectedPos]._children[0]._children[0].dispose();
                var ips = invPockets[selectedPos]._children[0];
                var amnt = new BABYLON.Rectangle2D({
                    id:ips._id+"_"+num, parent:ips, x:40, y:40,
                    children: [
                        new BABYLON.Text2D(num, {
                            id:ips._id+"_amount"+num,
                            marginAlignment: "h: center, v: center",
                            fontName: "22pt Arial"
                        })
                    ]
                });
                invPockets[selectedPos]._children[0].children[0] = amnt;
                return callback(true);
            }else {
                invPockets[selectedPos]._children[0].dispose();
                return callback(false);
            }
        }
    }
    //this.addBlock("grass",5);
    this.invbox = function() {
        return invBox;
    }
}
function theInventoryExtender(scene,camera,ui) {
    var _this = this;
    canToggle = false;
    setTimeout(function() {
        if(earth.canDo) {
            camera.position.y = earth.planet.getHeightAtCoordinates(camera.position.x,camera.position.z);
            setTimeout(function() {
                camera.canFall = false;
                var theINVEX = BABYLON.Mesh.CreateBox("theINVEX",40,scene);
                var invPos = theINVEX.position;
                theINVEX.position.y = camera.position.y+1000;
                theINVEX.actionManager = new BABYLON.ActionManager(scene);
                var maxX = camera.position.x+10;
                var minX = camera.position.x-10;
                var rePos = camera.position.x;
                var maxY = camera.position.x+10;
                var minY = camera.position.x-10;
                var rePosY = camera.position.y;
                this.done = false;
                buildMode = -1;
                var findTheBox = new BABYLON.Rectangle2D({
                    id: "ftb", parent:ui, x:1160, y:650,width:200,height:50,
                    fill:BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Gray()),
                    children: [
                        new BABYLON.Text2D("Find the fallen box!", {
                            id: "ftbt",
                            marginAlignment: "h: center, v: center",
                            fontName: "15pt Arial"
                        })
                    ]
                });
                var boxTracker = new BABYLON.Group2D({
                    parent: ui, id: "boxTracker", width: 80, height: 40, trackNode: theINVEX, origin: BABYLON.Vector2.Zero(),
                    children: [
                        new BABYLON.Rectangle2D({ id: "boxTrackerChild", width: 80, height: 26, x: 0, y: 0, origin: BABYLON.Vector2.Zero(), border: "#FFFFFFFF", fill: "#808080FF", children: [
                                new BABYLON.Text2D("Here it is", { marginAlignment: "h: center, v:center", fontName: "bold 12px Arial" })
                            ]
                        })
                    ]
                });
                var animateShake = setInterval(function() {
                    if(camera.position.x > minX && camera.position.x < maxX) {
                        camera.position.x = random(camera.position.x-0.1,camera.position.x+0.1);
                    }else {
                        camera.position.x = rePos;
                    }
                    if(camera.position.y > minY && camera.position.y < maxY) {
                        camera.position.y = random(camera.position.y,camera.position.y+1);
                    }else {
                        camera.position.y = rePosY;
                    }
                },1);
                _this.iexDo = function() {
                    findTheBox._children[0].dispose();
                    var textBoxFound = new BABYLON.Text2D("Great! you found it", {
                        id: "tbf", parent: findTheBox,
                        marginAlignment: "h: center, v: center",
                        fontName: "15pt Arial"
                    });
                    setTimeout(function() {
                        findTheBox.dispose();
                        var usageHint = new BABYLON.Rectangle2D({
                            id: "usageHint", parent:ui, x:400, y:400,width:700,height:50,
                            fill:BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color3.Gray()),children: [
                                new BABYLON.Text2D("This Device your found, turns the inventory into a dimension portal so you can collect more items.", {
                                    id: "uht1",
                                    marginAlignment: "h: center, v: center",
                                    fontName: "12pt Arial"
                                })
                            ]
                        });
                        setTimeout(function() {
                            usageHint.dispose();
                            theINVEX.dispose();
                            canOpenInventory = true;
                            canToggle = true;
                        },10000)
                    },4000);
                }
                var boxFall = setInterval(function() {
                    theINVEX.position.x+=1;
                    if(invPos.y > earth.planet.getHeightAtCoordinates(invPos.x,invPos.z)+inventoryMax) {
                        theINVEX.position.y-=1;
                    }else {
                        canMine = true;
                        clearInterval(boxFall);
                        clearInterval(animateShake);
                        camera.canFall = true;
                        _this.done = true;
                    }
                },1);
            },1000);
        }
    },100);
}
