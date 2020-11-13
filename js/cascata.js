

//Crea il corretto cubo in base all'altezza
function creaCascata() {
    
    var geometryCube = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(1,1,1));
     cascata =[];
     cascata2 = [];
    var p = true;
    for(var i=0; i<15; i++){
        for(var j = 0; j<5; j++){
            if(i<6){
                var cuboCascata = geometryCube.clone();
                var cuboCascata2 = geometryCube.clone();
                if(p == true){
                    cuboCascata.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.99),17-i, 4+j));
                    cuboCascata2.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.89),17-i, 4+j));
                    p = false;
                }else{
                    cuboCascata.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.85),17-i, 4+j));
                    cuboCascata2.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.75),17-i, 4+j));
                    p=true;
                }
                cascata.push(cuboCascata);
                cascata2.push(cuboCascata2);
                
            }else{
                var cuboCascata = geometryCube.clone();
                var cuboCascata2 = geometryCube.clone();
                if(p == true){
                    cuboCascata.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.6),17-i, 4+j));
                    cuboCascata2.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.5),17-i, 4+j));
                    p = false;
                }else{
                    cuboCascata.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.65),17-i, 4+j));
                    cuboCascata2.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.55),17-i, 4+j));
                    p=true;
                }
                cascata.push(cuboCascata);
                cascata2.push(cuboCascata2);
                
            }
        }
        
    }
    var  cascataCubes =  THREE.BufferGeometryUtils.mergeBufferGeometries(cascata);
    var  cascataCubes2 =  THREE.BufferGeometryUtils.mergeBufferGeometries(cascata2);
    meshCascata = new THREE.Mesh(cascataCubes, getMateriale("water"));
    meshCascata2 = new THREE.Mesh(cascataCubes2, getMateriale("water"));
    scene.add(meshCascata);
    scene.add(meshCascata2);
    
}

function animazioneCascata(){
    x=18;
    for (var i = 0; i < 15*5; i ++) {
        cascata[i].rotation.z += 0.001 ;
        cascata2[i].rotation.z += 0.0002 ;
    }

}