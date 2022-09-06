
import { useRef } from "react";
import { DoubleSide, Mesh, TextureLoader, BufferGeometry } from "three"
import { SphereModel } from "components/ui/Sphere/Sphere"

type TilesProps ={
    radius: number;
    tiles: ArrayLike<number>;
    //sphere: Mesh;
    
}
  


export default function  Panels(props: TilesProps) {
  const panel = useRef<Mesh>(null!);
  const texture = new TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1920px-Starsinthesky.jpg",
    );


 //onsole.log(props.sphere2.attributes.position.array);
  return (
      <mesh ref={panel} position={[1, 0, 0]} rotation={[-Math.PI / 2, 1, 0]}>
        
        <planeGeometry args= {[0.1, 0.1]}/>
        <meshStandardMaterial
            map = {texture}
            side={DoubleSide}
          
        />

      </mesh>
  );
}


export { Panels }

