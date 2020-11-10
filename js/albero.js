// --------------- FUNZIONI PER LA CREAZIONE DEGLI ALBERI -----------

function tree(){
    var scale = 1;
    var voxelSize = 16;
    let self = this;
        let mesh = new THREE.Object3D();
        let matrix = new THREE.Matrix4();
        let trunk;
        let leaves = [];

        let leavesColor = new THREE.Color('rgb(45,80,40)');
        let trunkColor = new THREE.Color('rgb(87,64,39)');

        // add trunk
        let trunkGeometry = new THREE.BoxGeometry(4,10,4);  
        trunk = new THREE.Mesh( trunkGeometry, new THREE.MeshPhongMaterial({
            color: trunkColor
        }));
        mesh.add(trunk);

        // add leaves
        for (let i = 0; i < 4; i++) {
            if (i === 3) {
                let leavesGeometry = new THREE.BoxGeometry(4,6,4);
                let leavesMesh = new THREE.Mesh( leavesGeometry, new THREE.MeshPhongMaterial({
                    color: leavesColor
                }));
                mesh.add(leavesMesh);
                break;
            }
            let leavesGeometry = new THREE.BoxGeometry(28 - 8 * i,8,28 - 8 * i);
            let leavesMesh = new THREE.Mesh( leavesGeometry, new THREE.MeshPhongMaterial({
                color: leavesColor
            }));
            mesh.add(leavesMesh);
        }
        mesh.traverse(function (obj) {
            obj.castShadow = true;
            obj.receiveShadow = true;
        });

        mesh.scale.set(
            1 / self.voxelSize * self.scale,
            1 / self.voxelSize * self.scale,
            1 / self.voxelSize * self.scale
        );
        return mesh;
}

function creaPino(posX, posY, posZ){
	var pino = new THREE.Object3D();
	var foglie = new THREE.Object3D();
	

	//tronco
	var w = 0.7;
	var h = 4;
    var d = 0.7;
    var leavesColor = new THREE.Color('rgb(45,80,40)');
    var trunkColor = new THREE.Color('rgb(87,64,39)');
	var geometriaTronco = new THREE.BoxGeometry(w,h,d);
    var materialTronco = new THREE.MeshPhongMaterial({color: trunkColor});
    var meshTronco = new THREE.Mesh(geometriaTronco, materialTronco);
    pino.add(meshTronco);
    //foglie

	for(var i=0; i < 5; i++){
		var decremento = 2;
		var geometriaFoglie = new THREE.BoxGeometry((w *3) - (i/decremento), 2 ,(d *3)- (i/decremento));
	    var materialFoglie = new THREE.MeshPhongMaterial({color: leavesColor});
	    var meshFoglie = new THREE.Mesh(geometriaFoglie, materialFoglie);	
	    meshFoglie.name = "foglie";	
	    meshFoglie.position.y += i; 
	    pino.add(meshFoglie);
    }
    pino.castShadow = true;
    pino.receiveShadow = true;	
    pino.position.set(posX,posY,posZ);
    return pino;
}