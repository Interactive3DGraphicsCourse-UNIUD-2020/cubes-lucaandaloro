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
    var boxVert = `
  	precision highp float;
    
    uniform float time;
    uniform float size;
    
  	attribute vec3 instancePosition;
    
  	varying vec3 vPos;
        
    float N (vec2 st) { // https://thebookofshaders.com/10/
        return fract( sin( dot( st.xy, vec2(12.9898,78.233 ) ) ) *  43758.5453123);
    }
    
    float smoothNoise( vec2 ip ){ // https://www.youtube.com/watch?v=zXsWftRdsvU
    	vec2 lv = fract( ip );
      vec2 id = floor( ip );
      
      lv = lv * lv * ( 3. - 2. * lv );
      
      float bl = N( id );
      float br = N( id + vec2( 1, 0 ));
      float b = mix( bl, br, lv.x );
      
      float tl = N( id + vec2( 0, 1 ));
      float tr = N( id + vec2( 1, 1 ));
      float t = mix( tl, tr, lv.x );
      
      return mix( b, t, lv.y );
    }
    
    void main() {
    	vPos = position;
      vec3 iPos = instancePosition * 0.125;
      float y = cos( iPos.x + time ) + sin( iPos.z + time * 0.75 ) * 0.5;
      
      vec2 ip = instancePosition.xz / ( size * 2. + 1. ) * 0.5; // normalizing of instancePosition
      ip.x -= time * 0.1;
      
      float c = smoothNoise( ip * 20. ); // noise for scaling the clouds' cubes
      
      vec3 n = position * step( 0.51, c ) + instancePosition; // scaled by noise
      n.y += y;
      
      vec4 mvPosition = modelViewMatrix * vec4( n, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
    }
  `;
  var boxFrag = `
  	precision highp float;
    
  	varying vec3 vPos;
    
    float edge ( vec2 uv, float size ) {
    	float d = max( uv.x, uv.y );
      return smoothstep( size, size - 0.0125, d );
    }
    
    void main() {
		
      float edgeWidth = 0.05;
      float size = 0.5 - edgeWidth; // 0.5 is a half of the lenght of an edge
      vec3 pos = abs( vPos );
      
      // make edges brighter
      float e = edge( pos.xy, size );
      e += edge( pos.xz, size );
      e += edge( pos.yz, size );

      vec3 c = mix( vec3( 1.0 ), vec3( 0.95 ), e);
      
      if ( vPos.y < -0.45 ) c *= vec3(0.85); // fake shading of clouds' bottom side

      gl_FragColor = vec4(c, 1.0);

    }
  `;

    var geom = createBoxWithRoundedEdges(1, 1, 1, 0.05, 1);

    var size = 30;

    var positions = [];
    for (let i = -size; i <= size; i++) {
    for (let j = -size; j <= size; j++) {
        positions.push(j, 30, i);
    }
    }

    var instancedGeometry = new THREE.InstancedBufferGeometry();
    instancedGeometry.attributes.position = geom.attributes.position;
    instancedGeometry.addAttribute('instancePosition', new THREE.InstancedBufferAttribute(new Float32Array(positions), 3));


    var mat = new THREE.ShaderMaterial({
    uniforms: {
        time: {
        value: 0
        },
        size: {
        value: size
        }
    },
    vertexShader: boxVert,
    fragmentShader: boxFrag
    });

    var instancedMesh = new THREE.Mesh(instancedGeometry, mat);
    instancedMesh.receiveShadow = true;
    scene.add(instancedMesh);
    
    var clock = new THREE.Clock();
    var time = 0;
   
    render();

    function render() {
    requestAnimationFrame(render);
    time += clock.getDelta();
    mat.uniforms.time.value = time;
    
    }


}

