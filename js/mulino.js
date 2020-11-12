function creaMulino(posX, posY, posZ){
	var casa = new THREE.Object3D();
	var muri = new THREE.Object3D();
	var porta = new THREE.Object3D();
    var tetto = new THREE.Object3D();
    var mulino = new THREE.Object3D();
	var w = 1;
	var h = 4;
	var d = 7;

	//muri
	muri.add(creaParete(0.5,3,5, 0, 0, 1, 0, 0 ));
	//facciata con la porta
	muri.add(creaParete(0.5,3,4.5, 0, 90, 3.5, 0, 2.5));
	muri.add(creaParete(0.5,3,4.5, 0, 0, 5, 0, 0));
	muri.add(creaParete(0.5,3,4.5, 0, 90, 3, 0, -2));



	//tetto
	for(var i = 4; i > 0; i--){
		var geometriaTetto = new THREE.BoxGeometry(9,0.5,9);
		//var materialTetto = new THREE.MeshPhongMaterial({ map: textureTetto });
		var meshTetto = new THREE.Mesh(geometriaTetto, getMateriale("terrain"));	
		meshTetto.scale.set(i / 6.5, 0.5,i / 6.5);
		meshTetto.position.y -= i/4; 
		tetto.add(meshTetto);
	}
	tetto.position.x += 3.2; 
    tetto.position.y += 2.5;
    tetto.position.z += 0.2; 
    
    //mulino
    var geometriaPerno = new THREE.CylinderGeometry( 0.3, 0.3, 4, 32 );
    var meshPerno = new THREE.Mesh(geometriaPerno, getMateriale("terrain"));
    meshPerno.rotation.x = 90 * Math.PI/180;
    meshPerno.position.x += -7.1;
    meshPerno.position.y += 8;
    meshPerno.position.z += -4.5;
    mulino.add(meshPerno);
    var geometry = new THREE.TorusGeometry( 3, 0.25, 6, 100 );
    var torus = new THREE.Mesh(geometry, getMateriale("terrain") );
    var torus2 = new THREE.Mesh(geometry, getMateriale("terrain"));
    torus.position.x += -7.1;
    torus.position.y += 7.5;
    torus.position.z += -4.5;
    torus2.position.x += -7.1;
    torus2.position.y += 7.5;
    torus2.position.z += -6.5;
    mulino.add(torus);
    mulino.add(torus2);

     //Pali1
            
     var paliGeom = new THREE.BoxGeometry(5.5,0.2,0.2);
     var material = new THREE.MeshBasicMaterial( {color:  new THREE.Color( 'orange' )} );
 
     let radiusr = 3;
    
     // Cambio il pivot così da generare la pala intorno
     paliGeom.translate(0, 0, -5);
     paliGeom.rotateX(Math.PI / 2);
     let paliMesh = new THREE.Mesh(paliGeom, material);
     paliMesh.rotation.x = 90 * Math.PI/180;
     paliMesh.rotation.y = 90 * Math.PI/180;
     paliMesh.position.x += -7.1;
     paliMesh.position.y += 8.3;
     paliMesh.position.z += -10;
     let paliCount = 10;
     let rotationStepPali = Math.PI * 2 / paliCount;
     
     paliMeshs = [];
     
     for (let i = 0; i < paliCount; i ++) {
        paliMeshs[i] = paliMesh.clone();
        paliMeshs[i].rotation.y = rotationStepPali * i;
        
         scene.add(paliMeshs[i]);
         
     }
     //Pali2     

    
     
     let paliMesh2 = new THREE.Mesh(paliGeom, material);
     paliMesh2.rotation.x = 90 * Math.PI/180;
     paliMesh2.rotation.y = 90 * Math.PI/180;
     paliMesh2.position.x += -7.1;
     paliMesh2.position.y += 8.3;
     paliMesh2.position.z += -12;

     paliMeshs2 = [];
     
     for (let i = 0; i < paliCount; i ++) {
        paliMeshs2[i] = paliMesh2.clone();
        paliMeshs2[i].rotation.y = rotationStepPali * i;
        
         scene.add(paliMeshs2[i]);
         
     }
   
    //Pale
            
    var palaGeom = new THREE.BoxGeometry(0.7,0.2,1.7);
    var material = new THREE.MeshBasicMaterial( {color:  new THREE.Color( 'orange' )} );

    let radius = 3;
   
    // Cambio il pivot così da generare la pala intorno
    palaGeom.translate(0, -radius, -5);
    palaGeom.rotateX(Math.PI / 2);
    let palaMesh = new THREE.Mesh(palaGeom, material);
    palaMesh.rotation.x = 90 * Math.PI/180;
    palaMesh.rotation.y = 90 * Math.PI/180;
    palaMesh.position.x += -7.1;
    palaMesh.position.y += 8;
    palaMesh.position.z += -11;
    let palaCount = 10;
    let rotationStep = Math.PI * 2 / palaCount;
    
    palaMeshs = [];
    
    for (let i = 0; i < palaCount; i ++) {
        palaMeshs[i] = palaMesh.clone();
        palaMeshs[i].rotation.y = rotationStep * i;
       
        scene.add(palaMeshs[i]);
        
    }
    

    mulino.position.set(10, -7.5, 1);
    


	casa.add(muri);
	casa.add(porta);
    casa.add(tetto);
    casa.add(mulino);
	casa.position.set(posX, posY, posZ);
    scene.add(casa);
    
    var clock = new THREE.Clock();
    var time = 0;
   
    render();

    function render() {
    requestAnimationFrame(render);
    //mulino.rotation.y -= 0.005;
    
    }
}

function creaParete(w, h, d, rotationZ, rotationY, traslationX, traslationY, traslationZ, texture){

	var geometria = new THREE.BoxGeometry(w,h,d);
	//var material = new THREE.MeshPhongMaterial({ map: texture });
	var mesh = new THREE.Mesh(geometria, getMateriale("terrain"));
	mesh.rotation.z += rotationZ * Math.PI/180;
	mesh.rotation.y += rotationY * Math.PI/180;
	mesh.position.x += traslationX;
	mesh.position.y += traslationY;
	mesh.position.z += traslationZ; 
	return mesh;
}