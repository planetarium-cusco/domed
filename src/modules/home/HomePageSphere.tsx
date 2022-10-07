import { SphereModel } from "components/ui/Sphere/Sphere";
import CanvasComponent from "components/ui/Canvas";
import FloorModel from "components/ui/Sphere/Floor";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";

import { SphereMeshProps } from "components/ui/Sphere/Sphere";

const HomePageContentSphere = ({
  radius = 24,
  widthSegments = Math.ceil(radius / 2),
}: SphereMeshProps) => {
  return (
    <>
      <VRButton />
      <CanvasComponent>
        <XR>
          <Controllers />
          <Hands />
        </XR>
        <SphereModel radius={radius} />
        <FloorModel radius={radius} widthSegments={widthSegments} />
      </CanvasComponent>
    </>
  );
};

export { HomePageContentSphere };
