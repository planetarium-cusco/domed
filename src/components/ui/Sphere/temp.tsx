import { Position } from "@react-three/drei/helpers/Position";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  BackSide,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  ObjectLoader,
  PlaneGeometry,
  TextureLoader,
  Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateUUID } from "three/src/math/MathUtils";

export default function App() {
  function Sphere() {
    const sphereRef = useRef<Mesh>(null!);

    const planeRef = useRef(null!);

    const planeGeometry = new PlaneGeometry(0.1, 0.1, 16, 16);
    const planeMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      side: DoubleSide,
    });

    const tempPlanes = new Object3D();

    useEffect(() => {
      let counter = 0;
      const vertices = sphereRef.current.geometry.attributes.position.array as Array<number>;

      const length = vertices.length;

      const lookDirection = new Vector3();
      const target = new Vector3();

      for (let i = 0; i < length; i += 3) {
        const id = (counter += 3);
        const v = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);

        tempPlanes.position.copy(v);
        console.log(tempPlanes.position);

        tempPlanes.updateMatrix();

        planeRef.current.setMatrixAt(id, tempPlanes.matrix);

        lookDirection.subVectors(tempPlanes.position, sphereRef.current.position).normalize();
        target.copy(tempPlanes.position).add(lookDirection);
        tempPlanes.lookAt(target);
      }

      planeRef.current.instanceMatrix.needsUpdate = true;
    }, []);

    return (
      <group>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1, 50, 25]} />
          <meshStandardMaterial color={0xa9a9a9} wireframe={true} />
        </mesh>
        <instancedMesh ref={planeRef} args={[planeGeometry, planeMaterial, 3000]} />
      </group>
    );
  }

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

  function Floor() {
    const floorRef = useRef<Mesh>(null!);
    return (
      <mesh ref={floorRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleBufferGeometry args={[1, 50]} />
        <meshStandardMaterial color={0xa9a9a9} wireframe={true} side={DoubleSide} />
      </mesh>
    );
  }

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
        <hemisphereLight color={0xffffff} groundColor={0xbbbbff} intensity={0.3} />
        <directionalLight position={[0.2, 1, 1]} />
        <Sphere />
        <Floor />
        <Controls />
      </Canvas>
    </div>
  );
}
