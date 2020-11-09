
// --------------- FUNZIONI PER LA CREAZIONE DEL TERRENO -----------
//import { materials } from '/materiali.js';
//return array with height data from img, taken from: http://danni-three.blogspot.it/2013/09/threejs-heightmaps.html
		function getHeightData(img,scale) {
  
		 if (scale == undefined) scale=1;
  
		    var canvas = document.createElement( 'canvas' );
		    canvas.width = img.width;
		    canvas.height = img.height;
		    var context = canvas.getContext( '2d' );
 
		    var size = img.width * img.height;
			console.log(size);
		    var data = new Float32Array( size );
 
		    context.drawImage(img,0,0);
 
		    for ( var i = 0; i < size; i ++ ) {
		        data[i] = 0
		    }
 
		    var imgd = context.getImageData(0, 0, img.width, img.height);
		    var pix = imgd.data;
 
		    var j=0;
		    for (var i = 0; i<pix.length; i +=4) {
		        var all = pix[i]+pix[i+1]+pix[i+2];  // all is in range 0 - 255*3
		        data[j++] = scale*all/3;   
		    }
     
		    return data;
        }

        function textureLoader( file ){
            var tl = new THREE.TextureLoader();
            var newTex = tl.load( file );
            newTex.magFilter = THREE.NearestFilter; // for lowres textures
            return newTex;
        }

        //Crea il corretto cubo in base all'altezza
        function creazioneCubo(i,y,posizione, width, height){

            var cube_geometry = new THREE.CubeGeometry(1, 1, 1);
            var water =  new THREE.MeshPhongMaterial({
                //map: textureLoader('../texture/water.png')
                color: 0x0892d0,
                shininess: 64,
                specular: new THREE.Color(0.31,0.31,0.31),
                opacity: 0.7,
                transparent: true,
                blendSrc: THREE.SrcAlphaFactor,
                blendDst: THREE.OneMinusSrcAlphaFactor,
                blendEquation: THREE.AddEquation
            });
            var water_black =  new THREE.MeshPhongMaterial({
                //map: textureLoader('../texture/water.png')
                color: 0x0892d0,
                shininess: 64,
                specular: new THREE.Color(0.31,0.31,0.31),
                opacity: 0.7,
                transparent: true,
                blendSrc: THREE.SrcAlphaFactor,
                blendDst: THREE.OneMinusSrcAlphaFactor,
                blendEquation: THREE.AddEquation
            });
            var sand = new THREE.MeshPhongMaterial({
                color: 0xfff5d5,
                //map: textureLoader('../texture/sand.png'),
                side: THREE.DoubleSide
            });

            var grass = new THREE.MeshPhongMaterial({
                map: textureLoader('textures/erba.jpg'),
                color: 0x98e070,
                side: THREE.DoubleSide
            });
            var dirt= new THREE.MeshPhongMaterial({
                //map: textureLoader('../texture/dirt.png'),
                color: 0x60571e,
                side: THREE.DoubleSide
            });
            var stone=  new THREE.MeshPhongMaterial({
                //map: textureLoader('../texture/stone.png'),
                color: 0xd4dcdd,
                side: THREE.DoubleSide
            });
			
                var cube;
                if(posizione<=4){
                    cube = new THREE.Mesh( cube_geometry, water_black) ;
                }else if(posizione>4 && posizione<10){
                    cube = new THREE.Mesh( cube_geometry, water);
                }
                else{
                    if(posizione<13){
                        cube = new THREE.Mesh( cube_geometry, grass ) ;
                        cube.castShadow = true;
			            cube.receiveShadow = true;
                    }else{
                        if(posizione>24){
                            cube = new THREE.Mesh( cube_geometry, sand ) ;
                            cube.castShadow = true;
			                cube.receiveShadow = true;
                        }else{
                            if(posizione<20){
                                cube = new THREE.Mesh( cube_geometry, dirt ) ;
                                cube.castShadow = true;
			                    cube.receiveShadow = true;
                            }else{
                                cube = new THREE.Mesh( cube_geometry, stone ) ;
                                cube.castShadow = true;
			                    cube.receiveShadow = true;
                            }
                        }
                    }
                }
                cube.position.set(i % width - width/2, posizione/2+y, i/width-height/2);
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
        function creazioneTerreno(data, width, height){
            

            for(var i = 0; i<data.length; i++){
                for(var y=0; y<data[i]; y++){
                    var cube = creazioneCubo(i,y,data[i], width, height);
                    //console.log("valore: " + data[i]);
                    scene.add( cube );
                }
                
                
				}

        }

        // Carico l'heightmap, chiamo la funzione per calcolare l'altezza e chiamo la funzione per creare il terreno
        function carica(image_src){
           
			var img = new Image();
			img.onload = function () {
                var data = getHeightData(img,0.1);
                creazioneTerreno(data, img.width, img.height);	
            }
			img.src = image_src;
        }

// --------------- FUNZIONI PER IL MOVIMENTO DELL'ACQUA -----------