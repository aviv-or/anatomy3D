//*******************************************//
//    container for every other 3d object    //
//*******************************************//
var renderer, scene, camera, skull;
init();
function init() {
  scene = new THREE.Scene();

  //*******************************************//
  //         Eyes to define point of view.     //
  //*******************************************//
  camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth / window.innerHeight, //Aspect Ratio
    0.1, //Near clipping plane
    1000 //Far clipping plane
  );

  renderer = new THREE.WebGLRenderer();
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
  // var skull;

  loader.load('models/skull.json', function(object) {
    skull = object;
    skull.rotation.x = 20 * Math.PI / 180;
    skull.rotation.y = 180 * Math.PI / 180;
    skull.position.y = -2;

    scene.add(skull);
  });

  // var axisHelper = new THREE.AxisHelper(5);
  // scene.add(axisHelper);

  //camera position
  camera.position.z = 10;
}

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

var reset;
var targetreset;

function skullPosition(target, x, y, z) {
  var position = {
    x: skull.rotation.x,
    y: skull.rotation.y,
    z: skull.rotation.z
  };
  reset = {
    x: skull.rotation.x,
    y: skull.rotation.y,
    z: skull.rotation.z
  };
  targetreset = target;

  console.log(position);
  console.log(target);
  // var target = { x: skull.rotation.x, y: 2.2, z: 3 };

  var tween = new TWEEN.Tween(position).to(target, 1500);

  tween.onUpdate(function() {
    skull.rotation.x = position.x;
    skull.rotation.y = position.y;
    skull.position.z = position.z;
  });

  tween.onComplete(function() {
    if (
      x.style.display === 'none' &&
      y.style.display === 'none' &&
      z.style.display === 'none'
    ) {
      x.style.display = 'block';
      y.style.display = 'block';
      z.style.display = 'block';
    } else {
      x.style.display = 'none';
      y.style.display = 'none';
      z.style.display = 'none';
    }
  });
  tween.start();
}

function closeBonePanel(bone){
  console.log("CLOSE ", bone)
  var x = document.getElementById(bone + 'circle');
  var y = document.getElementById(bone + 'info');
  var z = document.getElementById(bone + 'line');
  if (
    x.style.display === 'block' &&
    y.style.display === 'block' &&
    z.style.display === 'block'
  ) {
    x.style.display = 'none';
    y.style.display = 'none';
    z.style.display = 'none';
  }
}

function skullReset(bone) {
  closeBonePanel(bone);
  // var target = { x: skull.rotation.x, y: 2.2, z: 3 };
  var position = targetreset;
  var target = reset;

  console.log(position);
  console.log(target);

  var tween = new TWEEN.Tween(position).to(target, 720);

  tween.onUpdate(function() {
    skull.rotation.x = position.x;
    skull.rotation.y = position.y;
    skull.position.z = position.z;
  });

  tween.start();
}

function resetcanvas() {
  var oldcanv = document.getElementsByTagName('canvas');
  oldcanv[0].remove();
  closeBonePanel('mandible');
  closeBonePanel('temporal');
  closeBonePanel('maxilla');
  closeBonePanel('palatine');
  init();
}
