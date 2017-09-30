//*******************************************//
//    container for every other 3d object    //
//*******************************************//
var scene = new THREE.Scene();

//*******************************************//
//         Eyes to define point of view.     //
//*******************************************//
var camera = new THREE.PerspectiveCamera(
  75, //field of view
  window.innerWidth / window.innerHeight, //Aspect Ratio
  0.1, //Near clipping plane
  1000 //Far clipping plane
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//*******************************************//
//         Updates Viewport on Resize        //
//*******************************************//
window.addEventListener('resize', function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// var light = new THREE.AmbientLight(0x404040); // soft white light
// scene.add(light);

//controls (ORBIT CONTROL)
controls = new THREE.OrbitControls(camera, renderer.domElement);

// load a resource
// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setPath('models/');
// mtlLoader.load('beaver-best-exported.mtl', function(materials) {
//   materials.preload();
//   var objLoader = new THREE.OBJLoader();
//   objLoader.setMaterials(materials);
//   objLoader.setPath('models/');
//   objLoader.load('beaver-best-exported.obj', function(object) {
//     scene.add(object);
//   });
// });

var material = new THREE.MeshPhongMaterial({
  color: 0xaaaaaa,
  specular: 0x111111,
  shininess: 200
});

var loader = new THREE.STLLoader();
loader.load('models/SkullRef_01.stl', function(geometry) {
  var meshMaterial = material;
  if (geometry.hasColors) {
    meshMaterial = new THREE.MeshPhongMaterial({
      opacity: geometry.alpha,
      vertexColors: THREE.VertexColors
    });
  }
  var mesh = new THREE.Mesh(geometry, meshMaterial);
  mesh.position.set(0.5, 0.2, 0);
  mesh.rotation.set(-Math.PI / 2, Math.PI / 2, 0);
  mesh.scale.set(0.3, 0.3, 0.3);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
});

// var loader = new THREE.ObjectLoader();
// var skull;
//
// loader.load('models/skull.json', function(object) {
//   skull = object;
//   skull.rotation.x = 20 * Math.PI / 180;
//   skull.rotation.y = 180 * Math.PI / 180;
//   skull.position.y = -2;
//
//   scene.add(skull);
// });

var axisHelper = new THREE.AxisHelper(5);
scene.add(axisHelper);

//camera position
camera.position.z = 10;

animate();
function animate() {
  render();
  requestAnimationFrame(animate);
  TWEEN.update();
}

// draw Scene
function render() {
  renderer.render(scene, camera);
}

function skullPosition(target) {
  var position = {
    x: skull.rotation.x,
    y: skull.rotation.y,
    z: skull.rotation.z
  };
  // var target = { x: skull.rotation.x, y: 2.2, z: 3 };

  var tween = new TWEEN.Tween(position).to(target, 2000);

  tween.onUpdate(function() {
    skull.rotation.x = position.x;
    skull.rotation.y = position.y;
    skull.position.z = position.z;
  });

  tween.onComplete(function() {
    // alert('done!');
    var x = document.getElementById('redcircle');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  });
  tween.start();
}
