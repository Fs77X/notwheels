import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { STLLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
const fs = require('fs')
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


camera.position.set(10, 50, 200);
camera.rotation.x = (-90* Math.PI/ 180)


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
const readFile = (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = event => reject(event)
        reader.readAsText(file)
    })
}
const input = document.querySelector('input');
const epicChange = async () => {
    const curFiles = input.files;
    console.log(curFiles[0])
    readFile(curFiles[0]).then((content) => console.log(content)).catch((err) => {console.log(err)})


}
input.addEventListener('change', epicChange)