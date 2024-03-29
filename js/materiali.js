function getMateriale(materiale){
    switch(materiale){
        case "water":
            var material =  new THREE.MeshPhongMaterial({
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
        case "stone":
            var material =  new THREE.MeshPhongMaterial({
                color: "grey",
                side: THREE.DoubleSide
            });
            break;
            case "terrain":
            var material =  new THREE.MeshPhongMaterial({
                color: 0x8A6642,
                side: THREE.DoubleSide
            });
            break;
            case "sole":
            var material =  new THREE.MeshPhongMaterial({
                map: textureLoader('../textures/test_sole.png'),
                color: "yellow",
                side: THREE.DoubleSide,
                shininess: 100
            });
            break;
            case "mulino":
            var material =  new THREE.MeshPhongMaterial({
                map: textureLoader('../textures/wood.jpg'),
                side: THREE.DoubleSide,
                
            });
            break;
            case "mulinoPali":
            var material =  new THREE.MeshPhongMaterial({
                map: textureLoader('../textures/wood2.jpg'),
                side: THREE.DoubleSide,
                
            });
            break;
            case "nuvola":
            var material =  new THREE.MeshPhongMaterial({
                color: "white",
                side: THREE.DoubleSide,
                
            });
            break;
            case "tronco":
            var material =  new THREE.MeshPhongMaterial({
                color: 'rgb(87,64,39)',
                side: THREE.DoubleSide,
                
            });
            break;
            case "foglie":
                var material =  new THREE.MeshPhongMaterial({
                    color: 'rgb(45,80,40)',
                    side: THREE.DoubleSide,
                    
                });
                break;
    }
    return material;
}

function textureLoader( file ){
    var tl = new THREE.TextureLoader();
    var newTex = tl.load( file );
    newTex.magFilter = THREE.NearestFilter; 
    return newTex;
}


 
