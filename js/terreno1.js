
function include(file) {

    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;

    document.getElementsByTagName('head').item(0).appendChild(script);

}

/* Include Many js files */
include('js/materiali.js');

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
var waters = [ ];
    var grasss = [ ];
    var sands = [ ];
    var black_waters = [ ];
    var stones = [];


//Crea il corretto cubo in base all'altezza
function creazioneCubo(i, j, posizione, width, height) {

    var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
    var geometry = new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry(1,1,1));
    var cube;
    if (j>=0 && j < 0.5 ) {
        var sand = geometry.clone();
        sand.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        sands.push(sand);
    } else if(j<=0.5 && posizione<=7){
        var black_water = geometry.clone();
        black_water.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        black_waters.push(black_water);
    }else if(j<=2 && posizione<=7) {
        var water = geometry.clone();
        water.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        waters.push(water);
    }else if(j>5){
        var stone = geometry.clone();
        stone.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        stones.push(stone);
    }else{
        var grass = geometry.clone();
        grass.applyMatrix(new THREE.Matrix4().makeTranslation(i % width - width / 2,posizione / 2 + j, i / width - height / 2));
        grasss.push(grass);
        
    }
    
  


}

//Crea l'intero terreno aggiungendo i cubi
function creazioneTerreno(data, width, height) {


    for (var i = 0; i < width*height; i++) {
        for (var j = 0; j < data[i]/2; j++) {
            creazioneCubo(i, j, data[i], width, height);
            //console.log("valore: " + data[i]);
        }


    }
        var  watersCubes =  THREE.BufferGeometryUtils.mergeBufferGeometries(waters);
       var  grassCubes  =  THREE.BufferGeometryUtils.mergeBufferGeometries(grasss);
       // var  blackWaterCubes  =  THREE.BufferGeometryUtils.mergeBufferGeometries(black_waters);
        var  grass3Cubes  =  THREE.BufferGeometryUtils.mergeBufferGeometries(sands);
        var  montainCubes  =  THREE.BufferGeometryUtils.mergeBufferGeometries(stones);

        // ora abbiamo 1 mega mesh grande con 10 000 cubi al suo interno
        var meshWaters = new THREE.Mesh(watersCubes, new THREE.MeshPhongMaterial({
                //map: textureLoader('../texture/water.png')
                color: 0x0892d0,
                shininess: 64,
                specular: new THREE.Color(0.31,0.31,0.31),
                opacity: 0.7,
                transparent: true,
                blendSrc: THREE.SrcAlphaFactor,
                blendDst: THREE.OneMinusSrcAlphaFactor,
                blendEquation: THREE.AddEquation
            }));
        var meshGrass = new THREE.Mesh(grassCubes, new THREE.MeshPhongMaterial({
            map: textureLoader('textures/erba.jpg'),
            color: 0x98e070,
            side: THREE.DoubleSide
        }));
        //var meshGrass2 = new THREE.Mesh(blackWaterCubes, getMateriale(black_water));
        var meshGrass3 = new THREE.Mesh(grass3Cubes, new THREE.MeshPhongMaterial({
            color: 0xfff5d5,
            //map: textureLoader('../texture/sand.png'),
            side: THREE.DoubleSide
        }));
        var meshMontain= new THREE.Mesh(montainCubes, new THREE.MeshPhongMaterial({
                //map: textureLoader('../texture/stone.png'),
                color: "grey",
                side: THREE.DoubleSide
            }));
        

        scene.add(meshWaters);
        scene.add(meshGrass);
        //scene.add(meshGrass2);
        scene.add(meshGrass3);
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

