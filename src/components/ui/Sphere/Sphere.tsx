
import { useRef } from "react";
import { Mesh } from "three"



type SphereMeshProps = {
  radius: number;
};

export default function  SphereModel({ radius }: SphereMeshProps) {  
  const mesh = useRef<Mesh>(null!);
  return (
    <mesh ref={mesh}>
        <sphereGeometry args={[radius, 50, 25]} />
        {/* <meshPhongMaterial map={colorMap} side={BackSide} /> */}

        <meshStandardMaterial
          color = { 0xa9a9a9 }
          wireframe={true}
          // side={BackSide}
        />
      </mesh>
  );
}

export { SphereModel }
