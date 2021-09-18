import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

// const STLLoader = require("three/examples/jsm/loaders/STLLoader")
import { STLLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/STLLoader.js';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
const container = document.getElementById( 'canvas' );
document.body.appendChild( container );
renderer.setSize( 1200, 600 );
container.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement)
const light = new THREE.AmbientLight( 0xffffff, 1000);
// light.position.set( 0,0,0 );
scene.add( light );

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.set(10, 50, 200);
camera.rotation.x = (-90* Math.PI/ 180)
// camera.up = new THREE.Vector3(20, 1, 20)
// camera.lookAt(new THREE.Vector3(20,1,20))


const loader = new STLLoader()
loader.load('./src/viewer/obamium.stl', (obama) => {
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    material.metallness = 1
    const mesh = new THREE.Mesh(obama, material);
    scene.add(mesh);
    mesh.rotation.x = 270 * Math.PI/180
    
})
controls.update()
// Draw scene
var render = function () {
    controls.update()
    renderer.render(scene, camera);
};

// Run game loop (render,repeat)
var GameLoop = function () {
    requestAnimationFrame(GameLoop);

    render();
};

GameLoop();

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();
// renderer.render( scene, camera );
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// const light = new THREE.PointLight( 0xff0000, 1, 100 );
// light.position.set( 50, 50, 50 );
// scene.add( light );
// const loader = new STLLoader()
// loader.load('./src/viewer/obamium.stl', (obama) => {
//     const material = new THREE.MeshBasicMaterial( { color: 0xfffffff } );
//     const mesh = new THREE.Mesh(obama, material)
//     scene.add(mesh);
    
// })

// scene.add(cube);

// camera.position.z = 5;

// const animate = function () {
//     requestAnimationFrame(animate);

//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

//     renderer.render(scene, camera);
// };

// animate();