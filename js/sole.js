function creaSole(){
    var geometrySole =new THREE.BoxGeometry(6,6,6);
    var meshSole = new THREE.Mesh(geometrySole, getMateriale("sole"));

    meshSole.position.set( 20, 35, 40 );
    scene.add(meshSole);
}

