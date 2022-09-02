import { useEffect, useRef } from "react";
import { Layer } from "react-konva";
import { keyDown$ } from "../../config/keyboardEvent";
import NavigationMap from "../../navigation/NavigationMap";
import { ENavigationDirection } from "../../navigation/types";
import Content from "./content/ContentHomepage";

export const HOME_LAYER_ID = 0;
export const navHomepageObj = new NavigationMap();

const Homepage = () => {
  const keySubs$ = useRef<any>();

  useEffect(() => {
    console.log(">>>>> # ", navHomepageObj.map);

    keySubs$.current = keyDown$.subscribe((e) => {
      switch (e.key) {
        case "ArrowLeft":
          const x1 = navHomepageObj.navigate(ENavigationDirection.LEFT);
          // console.log(">>>> nav state", x1);
          break;
        case "ArrowRight":
          const x2 = navHomepageObj.navigate(ENavigationDirection.RIGHT);
          // console.log(">>>> nav state", x2);
          break;
        case "ArrowUp":
          const x3 = navHomepageObj.navigate(ENavigationDirection.UP);
          // console.log(">>>> nav state", x3);
          break;
        case "ArrowDown":
          const x4 = navHomepageObj.navigate(ENavigationDirection.DOWN);
          // console.log(">>>> nav state", x4);
          break;
        default:
      }
    });
  }, []);

  return (
    <Layer id={`${HOME_LAYER_ID}`} listening={false}>
      <Content layerId={HOME_LAYER_ID} />
    </Layer>
  );
};

export default Homepage;
