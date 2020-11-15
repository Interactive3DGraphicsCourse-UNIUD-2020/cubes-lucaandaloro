// --------------- FUNZIONE PER LA CREAZIONE DEL PONTE -----------

function creaPonte(){
	var ponte = new THREE.Object3D();

	//pavimento
	var x = -3;
	var y = 7;
	var z = 28;
	var geometriaBlocco = new THREE.BoxGeometry(3,0.6,2);
	var meshPavimento = new THREE.Mesh(geometriaBlocco, getMateriale("mulino"));	
	for(var i = 0; i < 12; i++){
		var salita = meshPavimento.clone();
		if(i<2){
			salita.position.set(x,y+i,z-i);
			salita.rotation.x = 45 * Math.PI/180;
		}else if(i>2 && i<4){
			salita.position.set(x,y+(i/1.5),z-(i/1.2));
			salita.rotation.x = 25 * Math.PI/180;
		}else if(i>4 && i<6){
			salita.position.set(x,y+(i/2),z-(i/1.2));
			salita.rotation.x = 10 * Math.PI/180;
		}else if(i>6 && i<8){
			salita.position.set(x,y+(i/2.9),z-(i/1.2));
			salita.rotation.x = -10 * Math.PI/180;
		}else if(i>8 && i<10){
			salita.position.set(x,y+(i/5),z-(i/1.2));
			salita.rotation.x = -30 * Math.PI/180;
		}else if(i>10){
			salita.position.set(x,y+(i/15),z-(i/1.2));
			salita.rotation.x = -40 * Math.PI/180;
		}else{
			salita = null;
		}
		ponte.add(salita);
	}
	ponte.rotation.y = 50 * Math.PI/180;
	scene.add(ponte);
}