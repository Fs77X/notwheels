import { useEffect, useRef, Suspense } from 'react';
import * as THREE from "three";
import { Canvas, mesh } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useLoader } from '@react-three/fiber'
import { Environment, OrbitControls } from "@react-three/drei";
import poke from './obamium.stl'
function Scene() {
    const stl = useLoader(STLLoader, poke)
    return <primitive object={stl} attach="geometry"></primitive>
}
function Viewer() {

    return (
        <div>
            <Canvas style={{height:"100vh"}}>
                <mesh>
                <Suspense fallback={null}>
                    <Scene />
                    <meshStandardMaterial color={"orange"}/>
                    {/* <Environment preset="sunset" background /> */}
                </Suspense>
                <OrbitControls />
                </mesh>
                <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            </Canvas>

        </div>
    );
}

export default Viewer;
