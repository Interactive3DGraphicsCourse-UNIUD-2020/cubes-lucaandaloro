
function include(file) {

    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;

    document.getElementsByTagName('head').item(0).appendChild(script);

}

/* Include Many js files */
include('/materiali.js');

// --------------- FUNZIONI PER LA CREAZIONE DEL TERRENO -----------

var height, width;
//return array with height data from img, taken from: http://danni-three.blogspot.it/2013/09/threejs-heightmaps.html
function getHeightData(img, scale) {
    width = img.width;
    height = img.height;

    if (scale == undefined) scale = 1;

    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext('2d');

    var size = img.width * img.height;
    console.log(size);
    var data = new Float32Array(size);

    context.drawImage(img, 0, 0);

    for (var i = 0; i < size; i++) {
        data[i] = 0
    }

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j = 0;
    for (var i = 0; i < pix.length; i += 4) {
        var all = pix[i] + pix[i + 1] + pix[i + 2];  // all is in range 0 - 255*3
        data[j++] = scale * all / 3;
    }

    return data;
}



//Crea il corretto cubo in base all'altezza
function creazioneCubo(i, j, posizione, width, height) {

    var cube_geometry = new THREE.CubeGeometry(1, 1, 1);

    var cube;
    if (j>=0 && j < 1 ) {
        cube = new THREE.Mesh(cube_geometry, getMateriale("dirt"));
    } else if(j<2 && posizione<=7){
        cube = new THREE.Mesh(cube_geometry, getMateriale("black_water"));
        
    }else if(j<=5 && posizione<=7) {
        cube = new THREE.Mesh(cube_geometry, getMateriale("water"));
    }else if(j>6){
        cube = new THREE.Mesh(cube_geometry, getMateriale("stone"));
    }else{
        cube = new THREE.Mesh(cube_geometry, getMateriale("grass"));
        
    }
    /*
    else {
        if (posizione < 13) {
            cube = new THREE.Mesh(cube_geometry, getMateriale("grass"));
            cube.castShadow = true;
            cube.receiveShadow = true;
        } else {
            if (posizione > 24) {
                cube = new THREE.Mesh(cube_geometry, getMateriale("sand"));
                cube.castShadow = true;
                cube.receiveShadow = true;
            } else {
                if (posizione < 20) {
                    cube = new THREE.Mesh(cube_geometry, getMateriale("dirt"));
                    cube.castShadow = true;
                    cube.receiveShadow = true;
                } else {
                    cube = new THREE.Mesh(cube_geometry, getMateriale("stone"));
                    cube.castShadow = true;
                    cube.receiveShadow = true;
                }
            }
        }
    }*/
    var x = i % width - width / 2;
    //console.log("x: " + x);
    var y = posizione / 2 + j;
    //console.log("y: " + y);
    var z = i / width - height / 2;
    //console.log("z: " + z);
    cube.position.set(x, y, z);

    /*
    if(posizione != 0){
        cube.scale.set(1, posizione, 1);
    }else{ 
        cube.scale.set(1, 0.1, 1);
    }
    */

    return cube;


}

//Crea l'intero terreno aggiungendo i cubi
function creazioneTerreno(data, width, height) {


    for (var i = 0; i < width*height; i++) {
        for (var j = 0; j < data[i]/2; j++) {
            var cube = creazioneCubo(i, j, data[i], width, height);
            console.log("valore: " + data[i]);

            scene.add(cube);

        }


    }

}

// Carico l'heightmap, chiamo la funzione per calcolare l'altezza e chiamo la funzione per creare il terreno
function carica(image_src) {

    var img = new Image();
    img.onload = function () {
        var data = getHeightData(img, 0.07);
        creazioneTerreno(data, img.width, img.height);
    }
    img.src = image_src;
}

// --------------- FUNZIONI PER IL MOVIMENTO DELL'ACQUA -----------