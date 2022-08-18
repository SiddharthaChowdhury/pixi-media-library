import { useEffect } from "react";
import { Layer } from "react-konva";
import NavigationMap from "../../navigation/NavigationMap";
import Content from "./content/ContentHomepage";

export const HOME_LAYER_ID = 0;
export const navHomepageObj = new NavigationMap();

const Homepage = () => {
  useEffect(() => {
    console.log(">>>>> # ", navHomepageObj.map);
  }, []);

  return (
    <Layer id={`${HOME_LAYER_ID}`}>
      <Content layerId={HOME_LAYER_ID} />
    </Layer>
  );
};

export default Homepage;
