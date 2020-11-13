

//Crea il corretto cubo in base all'altezza
function creaCascata() {
    var waters =[];
    for(var i=0; i<12; i++){
        for(var j = 0; j<5; j++){
            var geometryCube =new THREE.BoxGeometry(1,1,1);
            var meshWaters = new THREE.Mesh(geometryCube, getMateriale("water"));
            meshWaters.position.x = -17-(i*0.5);
            meshWaters.position.y = 16-i;
            meshWaters.position.z = 4+j;
            scene.add(meshWaters);

        }
        
    }
    
   
    
}