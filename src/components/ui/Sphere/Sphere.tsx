import { SphereGeometry } from "three";
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

export default function SphereModel(props: SphereMeshProps) {
  const sphereRef = useRef<Mesh>(null!);
  const geometryRef = useRef<Mesh>(null!);

  const planeRef = useRef(null!);
  const texture = new TextureLoader().load(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1920px-Starsinthesky.jpg"
  );
  const planeGeometry = new PlaneGeometry(0.13 * props.radius, 0.13 * props.radius);
  planeGeometry.rotateY(0.13);
  const planeMaterial = new MeshBasicMaterial({
    map: texture,
    side: DoubleSide,
    color: 0x999999,
  });

  const tempPlanes = new Object3D();

  const vectors: Vector3[] = [];

  // const vertices = new Float32Array([
  //   -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

  //   1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
  // ]);

  const vertices: Float32Array[] = [];

  const prueba: Float32Array[] = [];

  let iSize: number = 0;

  useEffect(() => {
    let counter = 0;
    const sphereVertices = sphereRef.current.geometry.attributes.position.array as Array<number>;

    const length = sphereVertices.length;

    const lookDirection = new Vector3();
    const target = new Vector3();

    const tempVertices = new Float32Array(sphereVertices);

    // for (let i = 0; i < length; i += 3) {
    //   const id = (counter += 3);
    //   const v = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);

    //   tempPlanes.position.copy(v);
    //   console.log(tempPlanes.position);

    //   tempPlanes.updateMatrix();

    //   planeRef.current.setMatrixAt(id, tempPlanes.matrix);

    //   lookDirection.subVectors(tempPlanes.position, sphereRef.current.position).normalize();
    //   target.copy(tempPlanes.position).add(lookDirection);
    //   tempPlanes.lookAt(target);
    //   const texture = new TextureLoader().load(
    //     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1920px-Starsinthesky.jpg"
    //   );
    // }
    // console.log(typeof planeRef);
    // planeRef.current.instanceMatrix.needsUpdate = true;

    sphereVertices
      .filter((_, i) => i % 3 === 0)
      .map((vert, i) => {
        const id = i * 3;

        const v = new Vector3(sphereVertices[id], sphereVertices[id + 1], sphereVertices[id + 2]);

        // tempPlanes.position.copy(v);
        // tempPlanes.updateMatrix();

        // planeRef.current.setMatrixAt(id, tempPlanes.matrix);
        // lookDirection.subVectors(tempPlanes.position, sphereRef.current.position).normalize();
        // target.copy(tempPlanes.position).add(lookDirection);
        // tempPlanes.lookAt(target);

        return vectors.push(v);
      });

    // const vertices: Float32Array[] = [];

    // vertices.push(sphereVertices);

    // console.log(vectors);
    // console.log(vertices);
    // console.log(tempVertices);

    vertices.push(tempVertices);
    iSize = length;

    const tempPrueba = new Float32Array([vertices[0][0], vertices[0][1], vertices[0][2]]);

    prueba.push(tempPrueba);
    // console.log(prueba[0]);
    // console.log(iSize);
    // console.log(vertices[0][0]);
  }, []);

  console.log(vertices[0]);

  //   const vertices: Vector3[] =[];
  //   sphereVerticesFlat
  //   .filter((_, index) => index % 3 === 0)
  //   .map((vert, index) => {
  //     if (//(index+0) % (props.widthsegments+1) != 0 // &&
  //       index > props.widthsegments-3 && index < (length/3-props.widthsegments)
  //       ) {
  //         console.log(index);
  //       // return v;
  //       const index_i = index*3;
  //       //console.log(sphereVerticesFlat[index_i+1]);
  //        const verticeVector = new Vector3(
  //         sphereVerticesFlat[index_i],
  //         sphereVerticesFlat[index_i + 1],
  //         sphereVerticesFlat[index_i + 2],
  //     )
  //       return vertices.push(verticeVector);
  //        }
  //   });

  //   console.log(vertices);
  //   //console.log(sphereVerticesFlat);
  //   //console.log(vertices[1].x);

  //   const lookDirection = new Vector3();
  //   const target = new Vector3();

  //   for (let i = 0; i < vertices.length-1; i += 1) {
  //     const id = (counter += 1);
  //     //console.log(vertices.length);
  //     var v = vertices[id]
  //     // new Vector3(sphereVerticesFlat[i], sphereVerticesFlat[i + 1], sphereVerticesFlat[i + 2]);
  //     //console.log(counter);
  //     tempPlanes.position.copy(v) ;
  //     //console.log(tempPlanes.position);

  //     tempPlanes.updateMatrix();

  //     planeRef.current.setMatrixAt(id, tempPlanes.matrix);

  //     lookDirection.subVectors(tempPlanes.position, sphereRef.current.position).normalize();
  //     target.copy(tempPlanes.position).add(lookDirection);
  //     tempPlanes.lookAt(target);
  //     const texture = new TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1920px-Starsinthesky.jpg",
  // );

  //   }
  //   //console.log(typeof planeRef)
  //   planeRef.current.instanceMatrix.needsUpdate = true;

  return (
    <group>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[props.radius, 50, 25]} />
        <meshStandardMaterial color={0xa9a9a9} wireframe={true} />
      </mesh>
      {/* <instancedMesh ref={planeRef} args={[planeGeometry, planeMaterial, 1987]} /> */}

      {/* <mesh ref={geometryRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={prueba[0]}
            count={3 / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <meshBasicMaterial attach="material" color={0xff0000} />
      </mesh> */}
    </group>
  );
}

export { SphereModel };
