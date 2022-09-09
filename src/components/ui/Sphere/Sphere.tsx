


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
      const planetextureRef = useRef(null!);
      const planeRef = useRef(null!);
      const texture = new TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1920px-Starsinthesky.jpg",
      );
      // var planeMaterial = new MeshBasicMaterial({
      //   map : texture,
      //   side: DoubleSide,
      //   color: 0x999999 ,
      // });
      
      
      const planeGeometry = new PlaneGeometry(0.13*props.radius, 0.13*props.radius);
      
  
      const tempPlanes = new Object3D();
  
      useEffect(() => {
        let counter = 0;
        const vertices = sphereRef.current.geometry.attributes.position.array as Array<number>;
        
        const length = vertices.length;
  
        const lookDirection = new Vector3();
        const target = new Vector3();
  
        for (let i = 0; i < length; i += 3) {
          if (true
            //Math.random() * 10 > 2.9956
            ) {
          const id = (counter += 3);
          const v = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
  
          tempPlanes.position.copy(v);
          console.log(tempPlanes.position);
  
          tempPlanes.updateMatrix();
  
          planeRef.current.setMatrixAt(id, tempPlanes.matrix);
          planetextureRef.current.map(texture); 
          
          lookDirection.subVectors(tempPlanes.position, sphereRef.current.position).normalize();
          target.copy(tempPlanes.position).add(lookDirection);
          tempPlanes.lookAt(target);
          
          //const planeMaterial = useRef<MeshBasicMaterial>(null!)
          // planeMaterial.current.map = texture;
          // planeMaterial.current.side = DoubleSide;
          
              
          
        } }
        console.log("planeref:")
        console.log(typeof planeRef)
        planeRef.current.instanceMatrix.needsUpdate = true;
        planetextureRef.current.instanceColor.needsUpdate = true;
      }, []);
  
      return (
        <group>
          <mesh ref={sphereRef}>
            <sphereGeometry args={[props.radius, 50, 25]} />
            <meshStandardMaterial color={0xa9a9a9} wireframe={true} />
          </mesh>
          <instancedMesh ref={planeRef} args={[planeGeometry, planetextureRef, 1991 ]} />
        </group>
      );
    }
  
export { SphereModel }
