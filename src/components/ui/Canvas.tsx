import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type CanvasProps = {
  children: React.ReactNode;
  radius?: number;
};

export default function CanvasComponent(props: CanvasProps, { radius = 36 }: CanvasProps) {
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
          fov: 75,
          near: 1,
          far: 1000,
          position: [0, 1, radius],
        }}
      >
        <color attach="background" args={[0x090c17]} />
        <hemisphereLight color={0xffffff} groundColor={0xbbbbff} intensity={0.3} />
        <directionalLight position={[0.2, 1, 1]} />
        {props.children}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export { CanvasComponent };
