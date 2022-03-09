import { useEffect } from "react";
import pixiClass from "../pixi/pixiClass";
import molecules from "../templates/basic/molecules";
import { teaserHMockData } from "../__mocks__/__mock__teaserH.data";

export const Playground2 = () => {
    useEffect(() => {
        setTimeout(() => {
            const lane = molecules.generateLane({
                name: 'Actuals',
                x: 0, 
                y: 0,
                teasers: teaserHMockData
            });

            pixiClass.pixiApp?.stage.addChild(lane);

        }, 500)
    }, [])

    return null;
}

export default Playground2;