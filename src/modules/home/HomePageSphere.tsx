import { SphereModel } from "components/ui/Sphere/Sphere";
import CanvasComponent from "components/ui/Canvas";
import FloorModel from "components/ui/Sphere/Floor";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";

import { SphereMeshProps } from "components/ui/Sphere/Sphere";
import { Detailed } from "@react-three/drei";

const HomePageContentSphere = ({
  radius = 96,
  widthSegments = Math.ceil(radius / 2),
}: SphereMeshProps) => {
  return (
    <>
      <VRButton />
      <CanvasComponent radius={radius}>
        <XR>
          <Controllers />
          <Hands />
        </XR>
        {/* <Detailed distances={[0, radius / 2, radius]}> */}
        <FloorModel radius={radius} widthSegments={widthSegments} />
        <SphereModel radius={radius} />
        {/* </Detailed> */}
      </CanvasComponent>
    </>
  );
};

export { HomePageContentSphere };
