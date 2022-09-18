import { FrontSide, MeshBasicMaterial, SphereGeometry, TextureLoader } from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, Mesh, Vector3, BackSide } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateUUID } from "three/src/math/MathUtils";
import { useTexture } from "@react-three/drei";

type SphereMeshProps = {
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
};

export default function SphereModel({
  radius = 6,
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

  const materials = [
    new MeshBasicMaterial({
      color: 0x00ff00,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0xff0000,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0x0000ff,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0xffff00,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0xf0f0ff,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0x00ffff,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0x00ff6f,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0x009fff,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0x002fff,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0xff06a4,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0xeea900,
      // side: BackSide,
    }),
    new MeshBasicMaterial({
      color: 0x00ffbd,
      // side: BackSide,
    }),
  ];

  const arrayMaterials: MeshBasicMaterial[] = [];

  const textures = useTexture(["/libra.jpg", "/tauro.jpg", "/c.jpg", "/d.jpg", "/e.jpg", "/f.jpg"]);
  const texturee = useTexture("/tauro.jpg");
  const textureee = useLoader(TextureLoader, "/tauro.jpg");

  const textureeee = useTexture(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1920px-Starsinthesky.jpg"
  );

  const images = [];

  // Object.keys(materials).forEach(key => {
  //   materials[key].forEach(name => images.push(name));
  // });

  // materials.forEach(material => {
  //   console.log(material);
  // });

  // console.log(images);

  const indices = [
    0,
    1,
    2, //Top
    0,
    2,
    3, //Top
    0,
    3,
    1, //Top

    1,
    2,
    4, // Left
    2,
    5,
    4, // Left

    2,
    3,
    5, // Right
    3,
    6,
    5, // Right

    3,
    1,
    6, // Back
    3,
    4,
    6, // Back

    4,
    5,
    7, // Bottom
    5,
    6,
    7, // Bottom
    6,
    4,
    7, // Bottom
  ];
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

    // console.log(vertices);
    // vertices.filter((vert, i) => i === 0);
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
        const v4 = vertices[x];
        const v5 = vertices[x + widthSegments + 1];
        const v6 = vertices[x + widthSegments + 1];

        // if (v1 && v2 && v3 && v4 && v5 && v6) {
        //   // console.log(v1, v2, v3, v4, v5, v6);

        //   planes.push([v1, v6, v3, v1, v3, v2]);
        // }

        // console.log(x);
        // console.log(v1, v6, v3);

        // console.log(v1, v3, v2);
        if (v1 && v3 && v6 && x < widthSegments * (heightSegments + 1) - 4) {
          // console.log(v1, v2, v3, v4, v5, v6);

          // console.log(x);

          // console.log(v1, v6, v3);
          planes.push([v1, v6, v3]); // Por fuera
          // planes.push([v3, v6, v1]); // Por dentro
        }

        if (x > widthSegments) {
          // console.log(v1, v2, v3, v4, v5, v6);

          console.log(x);
          console.log(v1, v3, v2);
          planes.push([v1, v3, v2]); // Por fuera
          // planes.push([v2, v3, v1]); // Por dentro
        }
      }
    });

    // setVertices(vertices);
    setPlanes(planes);

    // console.log(planes);
    //.slice(widthSegments, widthSegments + 3)
  }, [widthSegments]);

  useEffect(() => {
    if (planes) {
      console.log("planes", planes);
      // console.log(vector3ArrayToFloat32Array(planes[0]));
    }
  }, [planes]);

  // const prueba = materials.map((material, i) => console.log(i));
  // console.log(prueba);
  // console.log(textures);

  return (
    <group>
      <mesh>
        <planeBufferGeometry args={[1, 1]} />
        <meshBasicMaterial map={texturee} />
      </mesh>
      <mesh ref={sphereRef} visible={false}>
        <sphereGeometry args={[radius, widthSegments, heightSegments]} />
        {/* <meshStandardMaterial color={0xa9a9a9} wireframe={true} /> */}
      </mesh>
      {/* <instancedMesh ref={planeRef} args={[planeGeometry, planeMaterial, 1987]} /> */}
      {planes &&
        planes.map((plane, i) => {
          arrayMaterials.push(
            new MeshBasicMaterial({
              map: texturee,
              side: DoubleSide,
            })
          );

          // console.log(arrayMaterials);
          // Object.keys(files).forEach((key) => {
          //   files[key].forEach((name) => images.push(name));
          // });
          // console.log("plane", plane);
          return (
            <mesh key={i} material={materials[i]}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={vector3ArrayToFloat32Array(plane)}
                  count={plane.length}
                  itemSize={3}
                />
              </bufferGeometry>
              {/* <meshBasicMaterial
                attach="material"
                color={0xff0000}
                // side={DoubleSide}
                // wireframe={true}
              /> */}

              {/* <meshBasicMaterial
                attach="material"
                map={textureeee}
                needsUpdate={true}
                // color={undefined}
                // side={DoubleSide}
                wireframe={true}
              /> */}

              {/* {materials.map((material, j) => (
                <meshBasicMaterial color={material.color} key={j} />
              ))} */}

              {/* {textures.map((texture, j) => (
                <meshBasicMaterial key={texture.id} attach={`material-${j}`} map={texture} side={DoubleSide}/>
              ))} */}
            </mesh>
          );
        })}
    </group>
  );
}

export { SphereModel };
