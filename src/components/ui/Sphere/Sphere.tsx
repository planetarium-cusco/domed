import { SphereGeometry } from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, Mesh, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateUUID } from "three/src/math/MathUtils";

type SphereMeshProps = {
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
};

export default function SphereModel({
  radius = 20,
  widthSegments = Math.ceil(radius / 2),
  heightSegments = Math.floor(radius / 2),
}: SphereMeshProps) {
  const sphereRef = useRef<Mesh | null>(null);
  // const geometryRef = useRef<Mesh | null>(null);

  // const [vertices, setVertices] = useState<Vector3[] | null>(null);
  const [planes, setPlanes] = useState<Array<Vector3[]> | null>(null);

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

    // vertices.filter((vert, i) => i === 0);
    const planes: Array<Vector3[]> = [];

    vertices.forEach((vert, x) => {
      const v1 = vertices[x];
      const v2 = vertices[x + 1];
      const v3 = vertices[x + widthSegments + 1];
      const v4 = vertices[x + widthSegments];

      if (v1 && v2 && v3 && v4) {
        planes.push([v1, v2, v3, v4]);
      }
    });

    // setVertices(vertices);
    setPlanes(planes);

    console.log(planes);
    //.slice(widthSegments, widthSegments + 3)
  }, []);

  useEffect(() => {
    if (planes) {
      // vertices
      //   .filter((_, i) => i > 51)
      //   .map((vertex, j) => {
      //     // vertices[]
      //   });

      console.log("planes", planes);
      console.log(vector3ArrayToFloat32Array(planes[0]));
    }
  }, [planes]);

  return (
    <group>
      <mesh ref={sphereRef} visible={false}>
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        {/* <meshStandardMaterial color={0xa9a9a9} wireframe={true} /> */}
      </mesh>
      {/* <instancedMesh ref={planeRef} args={[planeGeometry, planeMaterial, 1987]} /> */}
      {planes &&
        planes.map((plane, i) => {
          console.log("plane", plane);
          return (
            <mesh key={i}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={vector3ArrayToFloat32Array(plane)}
                  count={plane.length}
                  itemSize={3}
                />
              </bufferGeometry>
              <meshBasicMaterial attach="material" color={0xff0000} side={DoubleSide} />
              {/* <meshStandardMaterial attach="material" color={0xff0000} /> */}
            </mesh>
          );
        })}
    </group>
  );
}

export { SphereModel };
