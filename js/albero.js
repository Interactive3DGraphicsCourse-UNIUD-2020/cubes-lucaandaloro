// --------------- FUNZIONI PER LA CREAZIONE DEGLI ALBERI -----------

function creaPino(posX, posY, posZ){
	var pino = new THREE.Object3D();	
	//tronco
	var w = 0.7;
	var h = 4;
    var d = 0.7;
	var geometriaTronco = new THREE.BoxGeometry(w,h,d);
    var meshTronco = new THREE.Mesh(geometriaTronco, getMateriale("tronco"));
    pino.add(meshTronco);

    //foglie

	for(var i=0; i < 5; i++){
		var decremento = 2;
		var geometriaFoglie = new THREE.BoxGeometry((w *3) - (i/decremento), 1 ,(d *3)- (i/decremento));
	    var meshFoglie = new THREE.Mesh(geometriaFoglie, getMateriale("foglie"));	
	    meshFoglie.name = "foglie";	
	    meshFoglie.position.y += i; 
	    pino.add(meshFoglie);
    }
    pino.castShadow = true;
    pino.receiveShadow = true;	
    pino.position.set(posX,posY,posZ);
    scene.add(pino);
}