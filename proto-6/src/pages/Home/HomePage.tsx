import { Container } from "@inlet/react-pixi/legacy";
import { useEffect, useRef } from "react";
import NavigationMap, {
  INavigationMapInst,
} from "../../navigation/NavigationMap";
import HomepageMainCol from "./columns/main/HomepageMainCol";

const LAYER_ID = 0;

const HomePage = () => {
  const navMap = useRef<INavigationMapInst>(new NavigationMap());

  useEffect(() => {
    setTimeout(() => {
      console.log(">>>>> Col rendered", navMap.current.map);
    }, 1000);
  }, []);
  return (
    <Container name="HOME-LAYER-0" x={0} y={0}>
      <HomepageMainCol navMapObj={navMap.current} layerId={LAYER_ID} />
    </Container>
  );
};

export default HomePage;
