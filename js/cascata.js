

//Crea il corretto cubo in base all'altezza
function creaCascata() {
    
    var geometryCube = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(1,1,1));
     cascata =[];
     cascata2 = [];
     grotta = [];
    var p = true;
    /*
    for(var i =0; i<15;i++){
        var cuboGrotta = geometryCube.clone();
        var cuboGrotta2 = geometryCube.clone();
        if(i<2){
            cuboGrotta.applyMatrix(new THREE.Matrix4().makeTranslation(-17,16+i,3));
            cuboGrotta2.applyMatrix(new THREE.Matrix4().makeTranslation(-16,16+i,3));
        }else if(i<10){
            cuboGrotta.applyMatrix(new THREE.Matrix4().makeTranslation(-17,19,3+i-3));
            cuboGrotta2.applyMatrix(new THREE.Matrix4().makeTranslation(-16,19,3+i-3));
        }else if(i<14){
            cuboGrotta.applyMatrix(new THREE.Matrix4().makeTranslation(-17,19-i+10,9));
            cuboGrotta2.applyMatrix(new THREE.Matrix4().makeTranslation(-16,19-i+10,9));
        }
        
        grotta.push(cuboGrotta);
        grotta.push(cuboGrotta2);
    }
    
    */
    for(var i=0; i<13; i++){
        for(var j = 0; j<5; j++){
            if(i<4){
                var cuboCascata = geometryCube.clone();
                var cuboCascata2 = geometryCube.clone();
                if(p == true){
                    cuboCascata.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.6)-2,16-i, 4+j));
                    cuboCascata2.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.5)-1.5,16-i, 4+j));
                    p = false;
                }else{
                    cuboCascata.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.3)-1.7,16-i, 4+j));
                    cuboCascata2.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.2)-1.4,16-i, 4+j));
                    p=true;
                }
                cascata.push(cuboCascata);
                cascata2.push(cuboCascata2);
                
            }else{
                var cuboCascata = geometryCube.clone();
                var cuboCascata2 = geometryCube.clone();
                if(p == true){
                    cuboCascata.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.6)-0.8,17-i, 4+j));
                    cuboCascata2.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.5)-0.6,17-i, 4+j));
                    p = false;
                }else{
                    cuboCascata.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.65)-0.8,17-i, 4+j));
                    cuboCascata2.applyMatrix(new THREE.Matrix4().makeTranslation(-15-(i*0.55)-0.6,17-i, 4+j));
                    p=true;
                }
                cascata.push(cuboCascata);
                cascata2.push(cuboCascata2);
                
            }
        }
        
    }
    var  cascataCubes =  THREE.BufferGeometryUtils.mergeBufferGeometries(cascata);
    var  cascataCubes2 =  THREE.BufferGeometryUtils.mergeBufferGeometries(cascata2);
    //var  grottaCubes =  THREE.BufferGeometryUtils.mergeBufferGeometries(grotta);
    meshCascata = new THREE.Mesh(cascataCubes, getMateriale("water"));
    meshCascata2 = new THREE.Mesh(cascataCubes2, getMateriale("water"));
    //meshGrotta = new THREE.Mesh(grottaCubes, getMateriale("terrain"));
    scene.add(meshCascata);
    scene.add(meshCascata2);
    //scene.add(meshGrotta);
    
}

function animazioneCascata(){
    x=18;
    for (var i = 0; i < 15*5; i ++) {
        cascata[i].rotation.z += 0.001 ;
        cascata2[i].rotation.z += 0.0002 ;
    }

}