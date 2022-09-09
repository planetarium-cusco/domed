
import { useRef } from "react";
import { DoubleSide, Mesh } from "three"


type FloorMeshProps = {
    radius: number;
  };
  


export default function  FloorModel({ radius }: FloorMeshProps) {
  const circle = useRef<Mesh>(null!);

  return (
      <mesh ref={circle} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleBufferGeometry args={[radius, 50]} />
        <meshStandardMaterial
          color = { 0xa9a9a9 }
          //wireframe={true}
          side={DoubleSide}
        />
      </mesh>
  );
}


export {FloorModel }