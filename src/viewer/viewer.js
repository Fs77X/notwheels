import { useEffect, useRef, Suspense } from 'react';
import * as THREE from "three";
import { Canvas, mesh } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useLoader } from '@react-three/fiber'
import { Environment, Loader, MapControls, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import poke from './obamium.stl'
function Scene() {
    const stl = useLoader(STLLoader, poke)
    // const loader = new STLLoader();
    // loader.load(poke, (geometry) => {
    //     geometry.computeBoundingBox();
    //     var bb = geometry.boundingBox;
    //     var object3DWidth = bb.max.x - bb.min.x;
    //     var object3DHeight = bb.max.y - bb.min.y;
    //     var object3DDepth = bb.max.z - bb.min.z;
    //     console.log(object3DWidth, object3DDepth, object3DHeight)
    // })

    // var box = geometry.boundingBox;
    return <primitive object={stl} attach="geometry"></primitive>
}
function Viewer() {

    return (
        <div>
            <Canvas style={{ height: "100vh" }}>
                <mesh>
                    <Suspense fallback={null}>
                        <Scene/>
                        <meshStandardMaterial color={"orange"} />
                        {/* <Environment preset="sunset" background /> */}
                    </Suspense>
                    {/* <OrbitControls/> */}
                    {/* <PerspectiveCamera position={[-10000000, -10000000, -1000000]} />
                    <OrbitControls /> */}
                </mesh>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
            </Canvas>

        </div>
    );
}

export default Viewer;
