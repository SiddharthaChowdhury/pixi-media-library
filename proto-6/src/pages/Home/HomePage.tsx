import { Container } from "@inlet/react-pixi/legacy";
import { throttleTime } from "rxjs";
import { createContext, useEffect, useRef } from "react";
import { keyDown$ } from "../../config/keyboardEvent";
import NavigationMap, {
  INavigationMapInst,
} from "../../navigation/NavigationMap";
import HomepageMainCol from "./columns/main/HomepageMainCol";
import { ENavigationDirection } from "../../navigation/types";

const LAYER_ID = 0;

interface IHomePageCtx {
  navObj?: INavigationMapInst;
}

export const HomePageCtx = createContext<IHomePageCtx>({});

const HomePage = () => {
  const navMap = useRef<INavigationMapInst>(new NavigationMap());
  const keySubs$ = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      console.log(">>>>> Col rendered", navMap.current.map);
    }, 1000);

    // navMap.current.setInitialFocus({
    //   ...navMap.current.activeState,
    //   vs: [1, 0],
    // });

    keySubs$.current = keyDown$.subscribe((e) => {
      switch (e.key) {
        case "ArrowLeft":
          const x1 = navMap.current.navigate(ENavigationDirection.LEFT);
          console.log(">>>> nav state", x1);
          break;
        case "ArrowRight":
          const x2 = navMap.current.navigate(ENavigationDirection.RIGHT);
          console.log(">>>> nav state", x2);
          break;
        case "ArrowUp":
          const x3 = navMap.current.navigate(ENavigationDirection.UP);
          console.log(">>>> nav state", x3);
          break;
        case "ArrowDown":
          const x4 = navMap.current.navigate(ENavigationDirection.DOWN);
          console.log(">>>> nav state", x4);
          break;
        default:
      }
    });
  }, []);
  return (
    <HomePageCtx.Provider value={{ navObj: navMap.current }}>
      <Container name="HOME-LAYER-0" x={0} y={0}>
        <HomepageMainCol navMapObj={navMap.current} layerId={LAYER_ID} />
      </Container>
    </HomePageCtx.Provider>
  );
};

export default HomePage;
