// --------------- FUNZIONE PER LA CREAZIONE DEL MULINO -----------

function creaMulino(){
	var muri = new THREE.Object3D();
    var mulino = new THREE.Object3D();
	var w = 1;
	var h = 4;
	var d = 7;

	//muri
	muri.add(creaParete(0.5,3,5, 0, 0, -9, 8, -1.4 ));
	muri.add(creaParete(0.5,3,5, 0, 90, -6.3, 8, 0.4));
	muri.add(creaParete(0.5,3,5, 0, 0, -4, 8, -1.4));
	muri.add(creaParete(0.5,3,5, 0, 90, -6.3, 8, -3.4));
    mulino.add(muri);


    //tetto
    
    var geometria = new THREE.BoxGeometry(0.5,5,5);

	var meshTetto = new THREE.Mesh(geometria, getMateriale("mulino"));
	meshTetto.rotation.z += 60 * Math.PI/180;
	meshTetto.position.x += -5;
	meshTetto.position.y += 10;
    meshTetto.position.z += -1.34; 
    mulino.add(meshTetto);
	
	var meshTetto2 = new THREE.Mesh(geometria, getMateriale("mulino"));
	meshTetto2.rotation.z += -60 * Math.PI/180;
	meshTetto2.position.x += -8;
	meshTetto2.position.y += 10;
    meshTetto2.position.z += -1.34; 
    mulino.add(meshTetto2);

    
    // Mulino
    var geometriaPerno = new THREE.CylinderGeometry(0.3, 0.3, 4, 32);
    var meshPerno = new THREE.Mesh(geometriaPerno, getMateriale("terrain"));
    meshPerno.rotation.x = 90 * Math.PI/180;
    meshPerno.position.x += -7.1;
    meshPerno.position.y += 8;
    meshPerno.position.z += -4.5;
    mulino.add(meshPerno);
    var geometry = new THREE.TorusGeometry( 3, 0.25, 6, 100 );
     torus = new THREE.Mesh(geometry, getMateriale("mulinoPali") );
    torus2 = new THREE.Mesh(geometry, getMateriale("mulinoPali"));
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
     var radiusr = 3;
    
     // Cambio il pivot così da generare la pala intorno
     paliGeom.translate(0, 0, -5);
     paliGeom.rotateX(Math.PI / 2);
     var paliMesh = new THREE.Mesh(paliGeom, getMateriale("mulinoPali"));
     paliMesh.rotation.x = 90 * Math.PI/180;
     paliMesh.rotation.y = 90 * Math.PI/180;
     paliMesh.position.x += -7.1;
     paliMesh.position.y += 7.8;
     paliMesh.position.z += -9.5;
     var paliCount = 10;
     var rotationStepPali = Math.PI * 2 / paliCount;
     
     paliMeshs = [];
     
     for (var i = 0; i < paliCount; i ++) {
        paliMeshs[i] = paliMesh.clone();
        paliMeshs[i].rotation.y = rotationStepPali * i;
        
         mulino.add(paliMeshs[i]);
         
     }
     //Pali2     

    
     
     var paliMesh2 = new THREE.Mesh(paliGeom, getMateriale("mulinoPali"));
     paliMesh2.rotation.x = 90 * Math.PI/180;
     paliMesh2.rotation.y = 90 * Math.PI/180;
     paliMesh2.position.x += -7.1;
     paliMesh2.position.y += 7.8;
     paliMesh2.position.z += -11.5;

     paliMeshs2 = [];
     
     for (var i = 0; i < paliCount; i ++) {
        paliMeshs2[i] = paliMesh2.clone();
        paliMeshs2[i].rotation.y = rotationStepPali * i;
        
         mulino.add(paliMeshs2[i]);
         
     }
   
    //Pale
            
    var palaGeom = new THREE.BoxGeometry(0.7,0.2,1.7);
    var radius = 3;
   
    // Cambio il pivot così da generare la pala intorno
    palaGeom.translate(0, -radius, -5);
    palaGeom.rotateX(Math.PI / 2);
    var palaMesh = new THREE.Mesh(palaGeom, getMateriale("mulino"));
    palaMesh.rotation.x = 90 * Math.PI/180;
    palaMesh.rotation.y = 90 * Math.PI/180;
    palaMesh.position.x += -7.1;
    palaMesh.position.y += 7.5;
    palaMesh.position.z += -10.5;
    var palaCount = 10;
    var rotationStep = Math.PI * 2 / palaCount;
    
    palaMeshs = [];
    
    for (var i = 0; i < palaCount; i ++) {
        palaMeshs[i] = palaMesh.clone();
        palaMeshs[i].rotation.y = rotationStep * i;
        mulino.add(palaMeshs[i]);
    }
    
  
	
    scene.add(mulino);
    
}

function creaParete(w, h, d, rotationZ, rotationY, traslationX, traslationY, traslationZ){

	var geometria = new THREE.BoxGeometry(w,h,d);
	
	var mesh = new THREE.Mesh(geometria, getMateriale("mulino"));
	mesh.rotation.z += rotationZ * Math.PI/180;
	mesh.rotation.y += rotationY * Math.PI/180;
	mesh.position.x += traslationX;
	mesh.position.y += traslationY;
	mesh.position.z += traslationZ; 
	return mesh;
}

function animazioneMulino(){
    for (var i = 0; i < 10; i ++) {
        palaMeshs[i].rotation.y -= 0.005 ;
        paliMeshs[i].rotation.y -= 0.005 ;
        paliMeshs2[i].rotation.y -= 0.005 ;
    }
    torus.rotation.z -=0.005;
    torus2.rotation.z -=0.005;
}