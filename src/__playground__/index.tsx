import { BaseTexture, Container, Rectangle, Sprite, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { setSpriteSizeCover } from "../pixi/helpers/__spriteHelper";
import pixiClass from "../pixi/pixiClass";
import { teaserHMockData } from "../__mocks__/__mock__teaserH.data";

const teaser1 = teaserHMockData[0];

const Playground = () => {
    const [containers, setContainers] = useState<Container[]>([]);
    useEffect(() => {
        setTimeout(() => {
            if(pixiClass.pixiLoader && pixiClass.isPixiReady) {
                const resources = [
                    pixiClass.pixiLoader.resources.TeaserH
                ];
    
                const width = 300, height = 150;
                const container = new Container();
                const WrapperSprite = new Sprite(pixiClass.pixiLoader.resources.TeaserH.texture);
                const TeaserImgSprite = Sprite.from("https://random.imagecdn.app/500/500");
                const mask = setSpriteSizeCover(TeaserImgSprite, width, height);
                TeaserImgSprite.x = 0;
                TeaserImgSprite.y = 0;


                container.addChild(WrapperSprite, mask, TeaserImgSprite);
                
                const containerList = [
                    ...containers,
                    container
                ]
                setContainers(containerList);
            }
        }, 1000);
    }, [pixiClass.pixiLoader])

    useEffect(() => {
        
        if(containers && containers.length > 0) {
            containers.forEach((container) => {
                container.x = 50;
                container.y = 50;
                pixiClass.pixiApp?.stage.addChild(container);
            })
           
        }
    }, [containers])

    return null;
}

export default Playground;