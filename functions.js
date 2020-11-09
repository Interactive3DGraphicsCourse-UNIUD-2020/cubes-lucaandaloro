
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
function terreno(image_src) {

    var img = new Image();
    img.onload = function () {
        var data = getHeightData(img, 0.06);
        creazioneTerreno(data, img.width, img.height);
    }
    img.src = image_src;
}

// --------------- FUNZIONE PER LA CREAZIONE DEL PONTE -----------

function ponte(posX, posY, posZ){
	var ponte = new THREE.Object3D();
	var pavimento = new THREE.Object3D();

	//pavimento
	var w = 2;
	var h = 0.6;
	var d = 2;
	var yPrec;
	for(var i = 0; i < 7; i++){
			var geometriaPavimento = new THREE.BoxGeometry(w,h,d);
            var material = new THREE.MeshPhongMaterial({
                color: ("brown")
            });
			var meshPavimento = new THREE.Mesh(geometriaPavimento, material);	
		if( i <= 3){
			meshPavimento.position.y += i/2;
			meshPavimento.position.z += i*1.5;
			yPrec = meshPavimento.position.y;
			
		}else{
			meshPavimento.position.y = yPrec - 0.5; 
			meshPavimento.position.z += i*1.5;
			yPrec = meshPavimento.position.y;
		}
		pavimento.add(meshPavimento);
	}
	
	ponte.add(pavimento);
	ponte.position.set(posX, posY, posZ);
	scene.add(ponte);
}





// --------------- FUNZIONI PER IL MOVIMENTO DELL'ACQUA -----------