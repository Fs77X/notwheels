import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { STLLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/STLLoader.js';
import { GLTFExporter } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/exporters/GLTFExporter.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
// import * as ThreeCSG from 'Three.CSG.js'
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
const loader = new STLLoader()


loader.load('./NotWheels_boxcar_3.stl', (clinton) => {
    const material = new THREE.MeshBasicMaterial( { color: 0xFF6756 } );
    material.metallness = 1
    const mesh = new THREE.Mesh(clinton, material);
    mesh.name = "wheel2"
    scene.add(mesh);
    mesh.rotation.x += 270 * Math.PI/180; 
    mesh.rotation.z += -90 * Math.PI/180; 
    // mesh.rotation.y += 90 * Math.PI/180; 
})

loader.load('./models/Glorious-Lappi.stl', (obama) => {
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    material.metallness = 1
    const mesh = new THREE.Mesh(obama, material);
    mesh.name = "obama"
    scene.add(mesh);
    mesh.rotation.x = 270 * Math.PI / 180
    obama.computeBoundingBox();
    var bb = obama.boundingBox;
    var object3DWidth = bb.max.x - bb.min.x;
    var object3DHeight = bb.max.y - bb.min.y;
    var object3DDepth = bb.max.z - bb.min.z;
    console.log(object3DWidth, object3DDepth, object3DHeight)
    object3DDepth /= 13
    const newDepth = 1/object3DDepth
    object3DWidth /= 60
    const newWidth = 1/object3DWidth
    const zscale = (1/newWidth + 1/newDepth) * 0.01
    console.log(newDepth, newWidth)
    mesh.scale.y = newDepth
    mesh.scale.x = newWidth
    mesh.scale.z = newDepth
    mesh.position.y = 13
    mesh.position.z = 50
    mesh.position.x = -10
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
var exp = document.getElementById("clickMe")
exp.onclick = function () {
    console.log('fucks')
    const exporter = new GLTFExporter();
    exporter.parse(scene, function (stl) {
        const link = document.createElement( 'a' );
        link.style.display = 'none';
        document.body.appendChild( link );
        console.log(stl);
        link.href = URL.createObjectURL(new Blob( [ JSON.stringify(stl) ], { type: 'text/plain' } ), 'output.gltf');
        link.download = 'output.gltf';
        link.click();
    });
}