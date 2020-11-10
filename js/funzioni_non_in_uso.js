//Crea il corretto cubo in base all'altezza
function creazioneCubo(i, j, posizione, test, width, height) {
    if(j == 0 || j+1 >test || j+2 >test || j+3> test){
        var cube_geometry = new THREE.CubeGeometry(1, 1, 1);

        var cube;
        if (j>=0 && j < 1 ) {
            cube = new THREE.Mesh(cube_geometry, getMateriale("dirt"));
        } else if(j<=2 && posizione<=7){
            cube = new THREE.Mesh(cube_geometry, getMateriale("black_water"));
        }else if(j<=5 && posizione<=7) {
            cube = new THREE.Mesh(cube_geometry, getMateriale("water"));
        }else if(j>5){
            cube = new THREE.Mesh(cube_geometry, getMateriale("stone"));
        }else{
            cube = new THREE.Mesh(cube_geometry, getMateriale("grass"));
            
        }
        var x = i % width - width / 2;
        //console.log("x: " + x);
        var y = posizione / 2 + j;
        //console.log("y: " + y);
        var z = i / width - height / 2;
        //console.log("z: " + z);
        cube.position.set(x, y, z);

        return cube;
    }else{
        return null;
    }

}


//Crea l'intero terreno aggiungendo i cubi
function creazioneTerreno(data, width, height) {
    for (var i = 0; i < width * height; i++) {
        for (var j = 0; j < data[i]; j++) {
            var cube = creazioneCubo(i, j, data[i], data[i], width, height);
            console.log("valore: " + j + " data[i]: " + data[i]);
            if(cube != null){
                scene.add(cube);
            }
            
        }
    }
}