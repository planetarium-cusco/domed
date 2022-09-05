import { SphereModel } from "components/ui/Sphere/Sphere"
import CanvasComponent from "components/ui/Canvas";
import FloorModel from "components/ui/Sphere/Floor";

const Radius = 1;

const HomePageContentSphere = () => {
  return (
    <CanvasComponent>
        <SphereModel   radius={Radius}/>
        <FloorModel radius={Radius}/>
    </CanvasComponent>
    
  );
};

export { HomePageContentSphere };


