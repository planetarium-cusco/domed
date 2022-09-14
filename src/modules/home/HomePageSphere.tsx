import { SphereModel } from "components/ui/Sphere/Sphere";
import CanvasComponent from "components/ui/Canvas";
import FloorModel from "components/ui/Sphere/Floor";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";

// const Radius = 50;

const HomePageContentSphere = () => {
  return (
    <>
      <VRButton />
      <CanvasComponent>
        <XR>
          <Controllers />
          <Hands />
        </XR>
        <SphereModel />
        {/* <FloorModel radius={Radius}/> */}
      </CanvasComponent>
    </>
  );
};

export { HomePageContentSphere };
