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



// Carico l'heightmap, chiamo la funzione per calcolare l'altezza e chiamo la funzione per creare il terreno
function creaTerreno(image_src) {
    
    var img = new Image();
    img.onload = function () {
        var size = img.width * img.height;
        var data = new Float32Array(size);
        data = getHeightData(img, 0.15);
        //creazioneTerreno(data, img.width, img.height);
        drawCubes(data, img);

    }
    img.src = image_src;
}
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






// Ulteriore funzione per la creazione dei cubi (da testare)
function drawCubes(d, img){

    // viene usata una sola geometria per disegnare tutti i cubi
    var geometry = new THREE.BoxGeometry(1,1,1);

    // array di materiali utilizzati
    grey_materials = [];
    green_materials = [];
    blue_materials = [];
    for(var i=0; i<d.length; i++){

        // colore del pixel(0 - 255) in considerazione
        var pColor = Math.round(d[i]*10);

        if (d[i]<7.6){ /****************** BLUE ******************/

            var hsbColor = Math.trunc(pColor/255*100)+25;

            var exist = _check_color_material(blue_materials, hsbColor);

            // se non esiste lo creo e lo aggiungo all'array di materiali
            if(exist == -1){
                exist = blue_materials.length;
                blue_materials[exist] = new THREE.MeshBasicMaterial( {color: "hsl(" + 200 + ", " + 65+"%, " + hsbColor + "%)",transparent: true, opacity: 0.7});	// materiale di colore uguale al pixel dell'immagine
            }
            var mat = blue_materials[exist];

        } else if (d[i]<11){ /****************** GREEN ******************/

            var hsbColor = Math.round(pColor/255*100);
            var BColor = (100-hsbColor)-30; // hsB
            var SColor = hsbColor+20; // hSb

            var exist = _check_color_material(green_materials, BColor);

            // se non esiste lo creo e lo aggiungo all'array di materiali
            if(exist == -1){
                exist = green_materials.length;
                green_materials[exist] = new THREE.MeshPhongMaterial( {color: "hsl(" + 120 + ", " + SColor +"%, " + BColor + "%)", specular: 0x050505 } );	// materiale di colore uguale al pixel dell'immagine
            }
            var mat = green_materials[exist];

        } else if(d[i]<13){

            var r = Math.random();

            if(r > (d[i] - 10)/(13 - 10)){	// colore verde

                var hsbColor = Math.round(pColor/255*100);
                var BColor = (100-hsbColor)-30; // hsB
                var SColor = hsbColor+20; // hSb

                var exist = _check_color_material(green_materials, BColor);

                // se non esiste lo creo e lo aggiungo all'array di materiali
                if(exist == -1){
                    exist = green_materials.length;
                    green_materials[exist] = new THREE.MeshPhongMaterial( {color: "hsl(" + 120 + ", " + SColor +"%, " + BColor + "%)", specular: 0x050505 } );	// materiale di colore uguale al pixel dell'immagine
                }
                var mat = green_materials[exist];

            }else{	// colore grigio

                // aggiusto l'intensita' per rendere un effetto visivo migliore
                pColor -=25;

                var exist = _check_color_material(grey_materials, pColor);

                // se non esiste lo creo e lo aggiungo all'array di materiali
                if(exist == -1){
                    exist = grey_materials.length;
                    grey_materials[exist] = new THREE.MeshPhongMaterial( {color: "rgb(" + pColor + ", " + pColor + ", " + pColor + ")", specular: 0x050505 } );	// materiale di colore uguale al pixel dell'immagine
                }
                var mat = grey_materials[exist];

            }

        }else{ /****************** GREY ******************/
            // aggiusto l'intensita' per rendere un effetto visivo migliore
            pColor -=25;

            var exist = _check_color_material(grey_materials, pColor);

            // se non esiste lo creo e lo aggiungo all'array di materiali
            if(exist == -1){
                exist = grey_materials.length;
                grey_materials[exist] = new THREE.MeshPhongMaterial( {color: "rgb(" + pColor + ", " + pColor + ", " + pColor + ")", specular: 0x050505 } );	// materiale di colore uguale al pixel dell'immagine
            }
            var mat = grey_materials[exist];
        }

        var cube = new THREE.Mesh( geometry, mat );

        // imposto la posizione del cubo rispettando l'immagine originale
        cube.position.set(i%img.width - img.width/2, d[i]/2, Math.trunc(i/img.height) - img.height/2);
        // il cubo viene scalato in base al colore (0 basso - 25.5 alto)
        cube.scale.y = d[i];

        cube.castShadow = true;
        cube.receiveShadow = true;

        scene.add( cube );

    }

}
// controlla se esiste già un materiale in "materials" con colore == "colorValue"
function _check_color_material(materials, colorValue){
    for(var j=0; j<materials.length; j++){
        if(Math.trunc(materials[j].color.r * 255) == colorValue){
            return j;
        }
    }
    return -1;
}












// --------------- FUNZIONI PER IL MOVIMENTO DELL'ACQUA -----------