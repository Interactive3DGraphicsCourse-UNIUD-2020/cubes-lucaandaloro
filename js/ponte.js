// --------------- FUNZIONE PER LA CREAZIONE DEL PONTE -----------

function ponte(posX, posY, posZ){
	var ponte = new THREE.Object3D();
	var pavimento = new THREE.Object3D();

	//pavimento
	var w = 2;
	var h = 0.6;
	var d = 2;
	var yPrec;
	for(var i = 0; i < 7; i++){
			var geometriaPavimento = new THREE.BoxGeometry(w,h,d);
            var material = new THREE.MeshPhongMaterial({
                color: ("brown")
            });
			var meshPavimento = new THREE.Mesh(geometriaPavimento, material);	
		if( i <= 3){
			meshPavimento.position.y += i/2;
			meshPavimento.position.z += i*1.5;
			yPrec = meshPavimento.position.y;
			
		}else{
			meshPavimento.position.y = yPrec - 0.5; 
			meshPavimento.position.z += i*1.5;
			yPrec = meshPavimento.position.y;
		}
		pavimento.add(meshPavimento);
	}
	
	ponte.add(pavimento);
	ponte.position.set(posX, posY, posZ);
	scene.add(ponte);
}