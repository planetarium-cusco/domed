


import {  SphereGeometry } from "three"
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
  FrontSide,
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


type SphereMeshProps = {
  radius: number;
};


export default function  SphereModel(props: SphereMeshProps) {  
    
      const sphereRef = useRef<Mesh>(null!);
  
      const planeRef = useRef(null!);
      const texture = new TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1920px-Starsinthesky.jpg",
      );
      const planeGeometry = new PlaneGeometry(0.13, 0.13);
      const planeMaterial = new MeshBasicMaterial({
        map : texture,
        side: DoubleSide,
        color: 0x999999 ,
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
          const texture = new TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1920px-Starsinthesky.jpg",
      );

        }
        console.log(typeof planeRef)
        planeRef.current.instanceMatrix.needsUpdate = true;
      }, []);
  
      return (
        <group>
          <mesh ref={sphereRef}>
            <sphereGeometry args={[props.radius, 50, 25]} />
            <meshStandardMaterial color={0xa9a9a9} wireframe={true} />
          </mesh>
          <instancedMesh ref={planeRef} args={[planeGeometry, planeMaterial, 5000]} />
        </group>
      );
    }
  
export { SphereModel }
