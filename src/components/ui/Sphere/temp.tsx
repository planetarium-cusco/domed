import { Position } from "@react-three/drei/helpers/Position";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { JSXElementConstructor, ReactElement, ReactFragment, useEffect, useMemo, useRef } from "react";
import {
  BackSide,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  ObjectLoader,
  PlaneGeometry,
  TextureLoader,
  Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateUUID } from "three/src/math/MathUtils";

export default function App() {
const planeslist: any[] = [];
//const vv = new Vector3(3, 2, 3);

type TilesProps ={
  position: Vector3;
}

  function Plane(props: TilesProps) {
    const planeRef2 = useRef<Mesh>(null!);

    planeRef2.current?.position.copy(props.position);
    planeRef2.current?.lookAt(0,0,0);
    return (
      <mesh ref={planeRef2} dispose={null}>

          <planeGeometry args={[0.1, 0.1, 16, 16]} />

          <meshStandardMaterial color={0xffffff} side={DoubleSide} />
        </mesh>
    );
  }

  function Sphere() {
    const sphereRef = useRef<Mesh>(null!);


    useEffect(() => {
      const vertices = sphereRef.current.geometry.attributes.position
        .array as Array<number>;

      const length = vertices.length;

      // const lookDirection = new Vector3();
      // const target = new Vector3();
      var count= 0;
      for (let i = 0; i < length; i += 3) {
          const v = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
          planeslist.push(
            v
          //<Plane key={count} position ={v}/>  
          );
          //count ++;
          //planeRef.current.position.copy(v);
          
          //console.log(planeRef.current.position);
          // lookDirection
          //   .subVectors(planeRef.current.position, sphereRef.current.position)
          //   .normalize();
        
        
      }
      //const planecount = planespos.length;
    });

    return (
      <group>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1, 50, 25]} />

          <meshStandardMaterial
            color={0xa9a9a9}
            wireframe={true}
            // side={BackSide}
          />
          
          

        </mesh>
        {planeslist.map((_,index)=> 
          
          <Plane position ={planeslist[index]}/>
          )
          }

        
        
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
        <meshStandardMaterial
          color={0xa9a9a9}
          wireframe={true}
          side={DoubleSide}
        />
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
        <hemisphereLight
          color={0xffffff}
          groundColor={0xbbbbff}
          intensity={0.3}
        />
        <directionalLight position={[0.2, 1, 1]} />
        <Sphere />
        <Floor />
        <Controls />
      </Canvas>
    </div>
  );
}