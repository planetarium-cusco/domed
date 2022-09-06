
import { useEffect, useRef } from "react";
import { Mesh, SphereGeometry } from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { Position } from "@react-three/drei/helpers/Position";


type SphereMeshProps = {
  radius: number;
  Tiles2: ArrayLike<number> ;
  children: React.ReactNode;
  };


export default function  SphereModel(props: SphereMeshProps) {  
   const circle = useRef<Mesh>(null!);
  //const circlegeo =  useRef<SphereGeometry>(null!);
  //const asd= useEffect(()=>console.log(circle.current.geometry.attributes.position.array));
  useFrame(()=>(props.Tiles2 = circle.current.geometry.attributes.position.array));
    console.log(props.Tiles2)
  return (
    
        <mesh ref={circle} >
        <sphereGeometry args={[props.radius, 50, 25]}  />
        {/* <meshPhongMaterial map={colorMap} side={BackSide} /> */}

        <meshStandardMaterial
          color = { 0xa9a9a9 }
          wireframe={true}
          // side={BackSide}
        />
        {props.children}
      </mesh>
      

    
    
  );
}

export { SphereModel }
