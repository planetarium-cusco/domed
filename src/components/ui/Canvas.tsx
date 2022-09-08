
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrbitControls } from '@react-three/drei'
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type CanvasProps ={
    children: React.ReactNode;
}


export default function  CanvasComponent(props: CanvasProps) {
  
  /*
  function Controls() {
    const { camera, gl } = useThree();
    useEffect(() => {
      const controls = new OrbitControls(camera, gl.domElement);
      return () => {
        controls.dispose();
      };
    });
    return null;
  }
*/
  

  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{
          fov: 60,
          far: 100,
          position: [0, 0, 4],
        }}
      >
       
        <color attach="background" args={[0x090c17]} />
        <hemisphereLight
          color={0xffffff}
          groundColor={0xbbbbff}
          intensity={0.3}
        />
        <directionalLight position={[0.2, 1, 1]} />
        {props.children}
        
      </Canvas>
    </div>
  );
}


export { CanvasComponent }