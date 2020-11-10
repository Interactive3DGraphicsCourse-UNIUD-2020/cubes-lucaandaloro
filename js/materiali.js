function getMateriale(materiale){
    switch(materiale){
        case "water":
            var material =  new THREE.MeshPhongMaterial({
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
            break;
        case "black_water":
            var material =  new THREE.MeshPhongMaterial({
                //map: textureLoader('../texture/water.png')
                color: 0x183b57,
                shininess: 64,
                specular: new THREE.Color(0.31,0.31,0.31),
                opacity: 0.7,
                transparent: true,
                blendSrc: THREE.SrcAlphaFactor,
                blendDst: THREE.OneMinusSrcAlphaFactor,
                blendEquation: THREE.AddEquation
            });
            break;
        case "sand":
            var material = new THREE.MeshPhongMaterial({
                color: 0xfff5d5,
                //map: textureLoader('../texture/sand.png'),
                side: THREE.DoubleSide
            });
            break;
        case "grass":
             var material = new THREE.MeshPhongMaterial({
                map: textureLoader('textures/erba.jpg'),
                color: 0x98e070,
                side: THREE.DoubleSide
            });
            break;
        case "dirt":
            var material= new THREE.MeshPhongMaterial({
                //map: textureLoader('../texture/dirt.png'),
                color: 0x60571e,
                side: THREE.DoubleSide
            });
            break;
        case "stone":
            var material =  new THREE.MeshPhongMaterial({
                //map: textureLoader('../texture/stone.png'),
                color: "grey",
                side: THREE.DoubleSide
            });
            break;
    }
    return material;
}

function textureLoader( file ){
    var tl = new THREE.TextureLoader();
    var newTex = tl.load( file );
    newTex.magFilter = THREE.NearestFilter; // for lowres textures
    return newTex;
}


 
