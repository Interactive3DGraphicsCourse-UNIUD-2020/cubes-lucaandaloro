// Parte di codice preso dal seguqnete esempio https://discourse.threejs.org/t/clouds-of-cubes/3218

function createBoxWithRoundedEdges(width, height, depth, radius0, smoothness) {
    let shape = new THREE.Shape();
    let eps = 0.00001;
    let radius = radius0 - eps;
    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
    shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
    let geometry = new THREE.ExtrudeBufferGeometry(shape, {
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


function creaNuvole(){

    var size = 30;
    var geometry = createBoxWithRoundedEdges(1, 1, 1, 0.05, 1);
    var nuvole = [];
    for (let i = -4; i <= 4; i++) {
      for (let j = -4; j <= 4; j++) {
        var nuvola = geometry.clone();
        nuvola.applyMatrix(new THREE.Matrix4().makeTranslation(j, 30-j, i));
        nuvole.push(nuvola);
        
      }
  
    }
    var  nuvoleCubes =  THREE.BufferGeometryUtils.mergeBufferGeometries(nuvole);
    meshNuvole = new THREE.Mesh(nuvoleCubes, getMateriale("water"));

    meshNuvole.receiveShadow = true;
    scene.add(meshNuvole);
    
    var clock = new THREE.Clock();
    var time = 0;
   
    render();

    function render() {
    requestAnimationFrame(render);
    time += clock.getDelta();
    meshNuvole.position.x = time;
    
    }


}

