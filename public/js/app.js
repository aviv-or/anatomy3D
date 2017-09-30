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

//controls (ORBIT CONTROL)
controls = new THREE.OrbitControls(camera, renderer.domElement);

var loader = new THREE.ObjectLoader();
var skull;

loader.load('models/skull.json', function(object) {
  skull = object;
  skull.rotation.x = 20 * Math.PI / 180;
  skull.rotation.y = 180 * Math.PI / 180;
  skull.position.y = -2;

  scene.add(skull);
});

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
    alert('done!');
  });
  tween.start();
}
