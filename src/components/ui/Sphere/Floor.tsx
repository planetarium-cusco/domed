
import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useLoader } from "react-three-fiber";
import { DoubleSide, Mesh, TextureLoader } from "three"


type FloorMeshProps = {
    radius: number;
  };
  


export default function  FloorModel({ radius }: FloorMeshProps) {
  const circle = useRef<Mesh>(null!);

  const grass = useLoader(TextureLoader, "/grass.jpg");
  const grass2 = useTexture("/grass.jpg");

  return (
      <mesh ref={circle} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleBufferGeometry args={[radius, 50]} />
        <meshStandardMaterial
          // color = { 0xa9a9a9 }
          map = {grass2}
          // wireframe={true}
          side={DoubleSide}
        />
      </mesh>
  );
}


export {FloorModel }