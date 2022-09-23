import { FrontSide, MeshBasicMaterial, SphereGeometry, TextureLoader, Vector2 } from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, Mesh, Vector3, BackSide } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateUUID } from "three/src/math/MathUtils";
import { useTexture } from "@react-three/drei";

export type SphereMeshProps = {
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
};

export default function SphereModel({
  radius = 48,
  widthSegments = Math.ceil(radius / 2),
  heightSegments = Math.floor(radius / 2),
}: SphereMeshProps) {
  const faceCount = widthSegments * heightSegments;

  const sphereRef = useRef<Mesh | null>(null);

  const [planes, setPlanes] = useState<Array<Vector3[]> | null>(null);
  const [uvPlanes, setuvPlanes] = useState<Array<Vector2[]> | null>(null);

  const vector3ArrayToFloat32Array = (vectors: Vector3[]): Float32Array => {
    const array = new Float32Array(vectors.length * 3);
    vectors.forEach((vector, index) => {
      array[index * 3] = vector.x;
      array[index * 3 + 1] = vector.y;
      array[index * 3 + 2] = vector.z;
    });

    return array;
  };

  const vector2ArrayToFloat32Array = (
    vectors: Vector2[],
    vectors2: Vector2[],
    vectors3: Vector2[]
  ): Float32Array => {
    const array = new Float32Array(6);
    array[0] = vectors[0].x;
    array[1] = vectors[0].y;
    array[2] = vectors2[0].x;
    array[3] = vectors2[0].y;
    array[4] = vectors3[0].x;
    array[5] = vectors3[0].y;

    return array;
  };

  const textureee = useLoader(TextureLoader, "/tauro.jpg");

  useEffect(() => {
    const sphereVertices = sphereRef?.current?.geometry?.attributes?.position?.array;
    const sphereUvs = sphereRef?.current?.geometry?.attributes?.uv?.array;

    const uvLen = new Array<Array<number>>(faceCount); //widthSegments*6 + widthSegments*12 +widthSegments*6 //widthSegments*6*(1+2*(heightSegments-2)+1)

    if (typeof sphereVertices === "undefined" || typeof sphereUvs === "undefined") {
      return;
    }

    const vertices = Array.prototype.slice
      .call(sphereVertices)
      .filter((_, i) => i % 3 === 0)
      .map((vert, i) => {
        const id = i * 3;
        return new Vector3(sphereVertices[id], sphereVertices[id + 1], sphereVertices[id + 2]);
      });

    const planes: Array<Vector3[]> = [];

    vertices.forEach((vert, x) => {
      if (
        ((x + 1) % (widthSegments + 1) != 0 && x < widthSegments * (heightSegments + 1)) ||
        x == 0
      ) {
        // Borrar puntos M N O P
        const v1 = vertices[x];
        const v2 = vertices[x + 1];
        const v3 = vertices[x + widthSegments + 2];
        const v4 = vertices[x + widthSegments + 1];

        if (v1 && v3 && v4 && x < widthSegments * (heightSegments + 1) - (widthSegments + 1)) {
          // planes.push([v1, v4, v3]); // Por fuera
          planes.push([v3, v4, v1]); // Por dentro
        }

        if (x > widthSegments) {
          // planes.push([v1, v3, v2]); // Por fuera
          planes.push([v2, v3, v1]); // Por dentro
        }
      }
    });

    setPlanes(planes);

    // const arraysup =  [0.5, 1,  0, 0,   1,0,]; // Por fuera
    const arraySup = [1, 0, 0, 0, 0.5, 1]; //Por dentro
    // const arraymid = [0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1]; // Por fuera
    const arrayMid = [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1]; // Por dentro
    // const arrayinf = [0, 1, 0.5, 0, 1, 1];// Por fuera
    const arrayInf = [1, 1, 0.5, 0, 0, 1]; // Por dentro

    const finaluvarray = new Array();
    uvLen.fill(arraySup, 0, widthSegments).flat();
    uvLen.fill(arrayMid, widthSegments, widthSegments * heightSegments - widthSegments).flat;
    uvLen
      .fill(
        arrayInf,
        widthSegments * heightSegments - widthSegments,
        widthSegments * heightSegments
      )
      .flat();

    uvLen.map((uvArray, i) => {
      uvArray.map((uvsubarray, j) => {
        finaluvarray.push(uvsubarray);
      });
    });
    const floatuvlen = new Float32Array(finaluvarray);

    const uvs = Array.prototype.slice
      .call(floatuvlen)
      .filter((_, i) => i % 2 === 0)
      .map((uv, i) => {
        const id = i * 2;
        return new Vector2(floatuvlen[id], floatuvlen[id + 1]);
      });

    const uvPlanes: Array<Vector2[]> = [];

    uvs.forEach((uv, x) => {
      const uv1 = uvs[x];

      if (uv1) {
        uvPlanes.push([uv1]);
      }
    });

    setuvPlanes(uvPlanes);
  }, [widthSegments]);

  useEffect(() => {
    if (planes) {
    }
  }, [planes]);

  useEffect(() => {
    if (uvPlanes) {
    }
  }, [uvPlanes]);

  return (
    <group>
      <mesh ref={sphereRef} visible={false}>
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        <meshStandardMaterial color={0xa9a9a9} wireframe={true} />
      </mesh>

      {planes && (
        <mesh position={[0, planes[0][0].y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleBufferGeometry args={[planes[0][1].x, widthSegments]} />
          <meshBasicMaterial
            // color = { 0xa9a9a9 }
            map={new TextureLoader().load(`https://source.unsplash.com/random/200x200?sig=${0}`)}
            // wireframe={true}
            side={BackSide}
          />
        </mesh>
      )}

      {planes &&
        uvPlanes &&
        planes.map((plane, i) => {
          return (
            <mesh key={i}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={vector3ArrayToFloat32Array(plane)}
                  count={plane.length}
                  itemSize={3}
                />
                <bufferAttribute
                  attach="attributes-uv"
                  array={vector2ArrayToFloat32Array(
                    uvPlanes[i * 3],
                    uvPlanes[i * 3 + 1],
                    uvPlanes[i * 3 + 2]
                  )}
                  count={plane.length}
                  itemSize={2}
                />
              </bufferGeometry>
              <meshBasicMaterial
                attach="material"
                map={new TextureLoader().load(
                  `https://source.unsplash.com/random/200x200?sig=${
                    widthSegments % 2 === 0 ? (i % 2 === 0 ? i : i - 1) : i % 2 !== 0 ? i + 1 : i
                  }`
                )}
                side={DoubleSide}
                // wireframe={true}
              />
            </mesh>
          );
        })}
    </group>
  );
}

export { SphereModel };
