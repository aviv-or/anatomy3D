

//*******************************************//
//    container for every other 3d object    //
//*******************************************//
var scene = new THREE.Scene( );

//*******************************************//
//         Eyes to define point of view.     //
//*******************************************//
var camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth / window.innerHeight, //Aspect Ratio
    0.1, //Near clipping plane
    1000 //Far clipping plane
);

var renderer = new THREE.WebGLRenderer( );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);



//*******************************************//
//         Updates Viewport on Resize        //
//*******************************************//
window.addEventListener( 'resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

//controls (ORBIT CONTROL)
controls = new THREE.OrbitControls(camera, renderer.domElement);

var loader = new THREE.ObjectLoader();



loader.load(

    'models/skull.json',

    function(object){
        scene.add(object);
    }
);

//camera position
camera.position.z = 3;


// game logic
var update = function(){

    //rotate cube;
};


// draw Scene
var render = function(){
    renderer.render(scene, camera);
};

// run game loop (update, render, repeat)
var GameLoop = function(){
    requestAnimationFrame(GameLoop);

    update();
    render();
};

GameLoop();
