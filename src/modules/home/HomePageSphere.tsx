import { SphereModel } from "components/ui/Sphere/Sphere"
import CanvasComponent from "components/ui/Canvas";
import FloorModel from "components/ui/Sphere/Floor";
import Panels from "components/ui/Sphere/panels";
import { useRef } from "react";
import { DoubleSide, Mesh } from "three"
import { SphereBufferGeometryProps } from "@react-three/fiber";
import Spheretemp from "components/ui/Sphere/temp";
//import { tilesPos } from "components/ui/Sphere/Sphere";

const Radius = 1;
var TilesArray : Array<number> =  [1,2];

//const circle22 = useRef<typeof SphereModel>(null!);
const HomePageContentSphere = () => {
  return (
    <Spheretemp/>
    
    
  );
};

export { HomePageContentSphere };


