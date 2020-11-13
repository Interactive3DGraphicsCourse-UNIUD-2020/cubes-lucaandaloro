


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

var sands = [ ];
var waters = [ ];
var black_waters = [ ];
var grasss = [ ];
var terrains = [ ];
var stones = [];
var contatorePini = 0;
var distanza = 0;


//Crea il corretto cubo in base all'altezza
function creazioneCubo(i, j, posizione, ultimo, width, height) {
    var geometry = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(1,1,1));
    
    if (j>=0 && j < 0.5 ) {
        var sand = geometry.clone();
        sand.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        sands.push(sand);
    } else if(j<=1 && posizione<=6){
        var black_water = geometry.clone();
        black_water.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        black_waters.push(black_water);
    }else if(j<=2 && posizione<=6) {
        var water = geometry.clone();
        water.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        waters.push(water);
    }else if(j>2 && j<=4){
        distanza++;
        var grass = geometry.clone();
        grass.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        grasss.push(grass);
        if(j>=ultimo-1 && contatorePini<15 && distanza>400){
            creaPino(i % width - width / 2,posizione / 2 + j+2, i / width - height / 2);
            contatorePini++;
            distanza = 0;
        }
    }else if(j>4 && j<8){
        var terrain = geometry.clone();
        terrain.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        terrains.push(terrain);
    }else{
        var stone = geometry.clone();
        stone.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        stones.push(stone);  
    }
}

//Crea l'intero terreno aggiungendo i cubi
function creazioneTerreno(data, width, height) {
    for (var i = 0; i < width*height; i++) {
        for (var j = 0; j < data[i]/2; j++) {
            creazioneCubo(i, j, data[i],data[i]/2, width, height);
        }
    }
    var  sandCubes  =  THREE.BufferGeometryUtils.mergeBufferGeometries(sands);
    var  blackWaterCubes  =  THREE.BufferGeometryUtils.mergeBufferGeometries(black_waters);
    var  watersCubes =  THREE.BufferGeometryUtils.mergeBufferGeometries(waters);
    var  grassCubes  =  THREE.BufferGeometryUtils.mergeBufferGeometries(grasss);
    var  terrainsCubes  =  THREE.BufferGeometryUtils.mergeBufferGeometries(terrains);
    var  montainCubes  =  THREE.BufferGeometryUtils.mergeBufferGeometries(stones);

    // ora abbiamo 1 mega mesh grande con 10 000 cubi al suo interno
    var meshSand = new THREE.Mesh(sandCubes, getMateriale("sand"));
    var meshBlackWaters = new THREE.Mesh(blackWaterCubes, getMateriale("black_water"));
    meshWaters = new THREE.Mesh(watersCubes, getMateriale("water"));
    var meshGrass = new THREE.Mesh(grassCubes, getMateriale("grass"));
    var meshTerrains = new THREE.Mesh(terrainsCubes, getMateriale("terrain"));
    var meshMontain= new THREE.Mesh(montainCubes, getMateriale("stone"));
        
    scene.add(meshSand);
    scene.add(meshBlackWaters);
    scene.add(meshWaters);
    scene.add(meshGrass);
    scene.add(meshTerrains);
    scene.add(meshMontain);

}

// Carico l'heightmap, chiamo la funzione per calcolare l'altezza e chiamo la funzione per creare il terreno
function terreno(image_src) {

    var img = new Image();
    img.onload = function () {
        var data = getHeightData(img, 0.12);
        creazioneTerreno(data, img.width, img.height);
    }
    img.src = image_src;
}

