import { SphereGeometry } from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  useEffect,
  useMemo,
  useRef,
  useState,
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
  const sphereRef = useRef<Mesh | null>(null);
  const geometryRef = useRef<Mesh | null>(null);

  // const planeRef = useRef(null!);
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
  const [vertices, setVertices] = useState<Vector3[] | null>(null);

  useEffect(() => {
    const sphereVertices = sphereRef?.current?.geometry?.attributes?.position?.array;

    if (typeof sphereVertices === "undefined") {
      return;
    }

    const vertices = Array.prototype.slice
      .call(sphereVertices)
      .filter((_, i) => i % 3 === 0)
      .map((vert, i) => {
        const id = i * 3;
        return new Vector3(sphereVertices[id], sphereVertices[id + 1], sphereVertices[id + 2]);
      });

    setVertices(vertices);
  }, []);

  const vector3ArrayToFloat32Array = (vectors: Vector3[]): Float32Array => {
    const array = new Float32Array(vectors.length * 3);
    vectors.forEach((vector, index) => {
      array[index * 3] = vector.x;
      array[index * 3 + 1] = vector.y;
      array[index * 3 + 2] = vector.z;
    });

    return array;
  };

  useEffect(() => {
    if (vertices) {
      console.log(vector3ArrayToFloat32Array(vertices));
      console.log(geometryRef);
    }
  }, [vertices]);

  return (
    <group>
      <mesh ref={sphereRef} visible={false}>
        <sphereGeometry args={[props.radius, 50, 25]} />
        {/* <meshStandardMaterial color={0xa9a9a9} wireframe={true} /> */}
      </mesh>
      {/* <instancedMesh ref={planeRef} args={[planeGeometry, planeMaterial, 1987]} /> */}
      {vertices && (
        <mesh ref={geometryRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={vector3ArrayToFloat32Array(vertices)}
              count={vertices.length}
              itemSize={3}
            />
          </bufferGeometry>
          <meshBasicMaterial attach="material" color={0xff0000} />
        </mesh>
      )}
    </group>
  );
}

export { SphereModel };
