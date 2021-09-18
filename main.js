import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { STLLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer();
const container = document.getElementById('canvas');
document.body.appendChild(container);
renderer.setSize(1200, 600);
container.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement)
const light = new THREE.AmbientLight(0xffffff, 1000);
// light.position.set( 0,0,0 );
scene.add(light);


camera.position.set(10, 50, 200);
camera.rotation.x = (-90 * Math.PI / 180)
let path = ''
let selected = false;
const loader = new STLLoader()


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
const saveData = async (file) => {
    var formdata = new FormData();
    formdata.append("data", file);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/save/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
const input = document.querySelector('input');
const epicChange = async () => {
    console.log(scene.children)
    const oldObama = scene.getObjectByName("obama")
    if (oldObama) {
        scene.remove(oldObama)
    }
    const curFiles = input.files;
    await saveData(curFiles[0])
    path = './models/' + curFiles[0].name
    selected = true
    loader.load(path, (obama) => {
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        material.metallness = 1
        const mesh = new THREE.Mesh(obama, material);
        mesh.name = "obama"
        scene.add(mesh);
        mesh.rotation.x = 270 * Math.PI / 180
    })

}
input.addEventListener('change', epicChange)