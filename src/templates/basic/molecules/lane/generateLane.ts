import { Container } from "pixi.js";
import molicules from "..";
import Teaser from "../teaser/Teaser";
import { ITeaserInfo, ITeaserMeta, ITeaserStructure } from "../teaser/types";

interface ILaneProps {
    name: string;
    x: number;
    y: number;
    teasers: ITeaserInfo;
}

const generateLane = (props: ILaneProps) => {
    const { name, teasers } = props;

    const laneContainer = new Container();
    laneContainer.name = `${name}_Lane`;

    const teaserStructureData: ITeaserStructure = molicules.getTeaserStructureData(teasers.teaserType);
    const teaserWidth = teaserStructureData.boxDiam.width;

    const teaserCoord = {
        x: 0,
        y: 0,
        spaceBetweenPx: 10
    }

    teasers.meta.forEach((showData: ITeaserMeta, key: number) => {

        const teaserObj = new Teaser();
        const teaser = teaserObj.getTeaser({
            teaserType: props.teasers.teaserType,
            teaserData: showData,
            x: teaserCoord.x,
            y: teaserCoord.y,
            index: key
        })


        // const teaser = molicules.getTeaser();

        teaserCoord.x += teaserWidth + teaserCoord.spaceBetweenPx;
        laneContainer.addChild(teaser);
    })

    return laneContainer;
}

export default generateLane;