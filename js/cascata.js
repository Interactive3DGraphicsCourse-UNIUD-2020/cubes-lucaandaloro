

//Crea il corretto cubo in base all'altezza
function creaCascata() {
    var geometryCube =new THREE.BoxGeometry(1,1,1);
    var meshWaters = new THREE.Mesh(geometryCube, getMateriale("water"));
     cascata =[];
     cascata2 = [];
     var h = 0;
    var p = true;
    for(var i=0; i<15; i++){
        for(var j = 0; j<5; j++){
            if(i<6){
                cascata[h] = meshWaters.clone();
                cascata2[h] = meshWaters.clone();
                if(p == true){
                    cascata[h].position.x = -15-(i*0.99);
                    cascata2[h].position.x = -15-(i*0.89);
                    p = false;
                }else{
                    cascata[h].position.x = -15-(i*0.85);
                    cascata2[h].position.x = -15-(i*0.75);
                    p=true;
                }
                
                cascata[h].position.y = 18-i;
                cascata[h].position.z = 4+j;
                cascata2[h].position.y = 18-i;
                cascata2[h].position.z = 4+j;
                scene.add(cascata[h]);
                scene.add(cascata2[h]);
                h++;
            }else{
                cascata[h] = meshWaters.clone();
                cascata2[h] = meshWaters.clone();
                if(p == true){
                    cascata[h].position.x = -15-(i*0.6);
                    cascata2[h].position.x = -15-(i*0.5);
                    p = false;
                }else{
                    cascata[h].position.x = -15-(i*0.65);
                    cascata2[h].position.x = -15-(i*0.55);
                    p=true;
                }
                
                cascata[h].position.y = 18-i;
                cascata[h].position.z = 4+j;
                cascata2[h].position.y = 18-i;
                cascata2[h].position.z = 4+j;
                scene.add(cascata[h]);
                scene.add(cascata2[h]);
                h++;
            }
        }
        
    }
    
}

function animazioneCascata(){
    x=18;
    for (var i = 0; i < 15*5; i ++) {
        cascata[i].rotation.z += 0.001 ;
        cascata2[i].rotation.z += 0.0002 ;
    }

}