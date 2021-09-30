// --------------- FUNZIONI PER LA CREAZIONE DELLE NUVOLE -----------

// Parte di codice preso dal seguqnete esempio https://discourse.threejs.org/t/clouds-of-cubes/3218

function createBoxWithRoundedEdges(width, height, depth, radius0, smoothness) {
    var shape = new THREE.Shape();
    var eps = 0.00001;
    var radius = radius0 - eps;
    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
    shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
    var geometry = new THREE.ExtrudeBufferGeometry(shape, {
      depth: depth - radius0 * 2,
      bevelEnabled: true,
      bevelSegments: smoothness * 2,
      steps: 1,
      bevelSize: radius,
      bevelThickness: radius0,
      curveSegments: smoothness
    });

    geometry.center();

    return geometry;
  }


function aggiungiNuvola(w,h, x, y, z, altezza=0){
    var geom = createBoxWithRoundedEdges(1, 1, 1, 0.05, 1);
    var meshNuvola = new THREE.Mesh(geom, getMateriale("nuvola"));
    var nuvola = new THREE.Object3D();
    for(var i =0; i<h; i++){
        for(var j =0; j<w; j++){
            var nuvolaClone = meshNuvola.clone();
            nuvolaClone.position.set(x+j,y+altezza,z+w);
            nuvola.add(nuvolaClone);
        }
        w--;
        h--
    }
    return nuvola;
}

function creaNuvole(){
     nuvole = new THREE.Object3D();

    nuvole.add(aggiungiNuvola(4,5,0,30,0,));
    nuvole.add(aggiungiNuvola(10,8,10,30,3,1));
    nuvole.add(aggiungiNuvola(5,8,-15,30,3));
    nuvole.add(aggiungiNuvola(6,9,-24,30,-20));

    nuvole.add(aggiungiNuvola(4,5,24,30,-15));
    nuvole.add(aggiungiNuvola(10,8,-7,30,-22,2));
    nuvole.add(aggiungiNuvola(5,8,-15,30,3));
    nuvole.add(aggiungiNuvola(6,9,0,30,-27,1));
    nuvole.add(aggiungiNuvola(4,7,-24,30,25));
    nuvole.add(aggiungiNuvola(5,7,6,30,12));
    nuvole.add(aggiungiNuvola(5,10,17,30,0));
    scene.add(nuvole);
}
var clock = new THREE.Clock();
var time = 0;

function animazioneNuvole(){
   
    time += clock.getDelta();
    nuvole.position.x =  Math.cos(time) * 4;
}