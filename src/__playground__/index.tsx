import { Container, LoaderResource, Sprite, Text } from "pixi.js";
import { useEffect,  useRef,  useState } from "react";
import { setSpriteSizeCover } from "../pixi/helpers/__spriteHelper";
import pixiClass from "../pixi/pixiClass";
import { getTeaserFrame } from "../templates/basic/molicules/teaser/getTeaser";
import { teaserH_structureData } from "../templates/template_data/teasers.template_data";
import { teaserHMockData } from "../__mocks__/__mock__teaserH.data";

const teaser1 = teaserHMockData[0];

const Playground1 = () => {
    const containerRef = useRef<Container[]>([]);
    const [containerNames, forceRender] = useState<number[]>([]);
    useEffect(() => {
        setTimeout(() => {
            if(pixiClass.pixiLoader?.resources.TeaserH && pixiClass.isPixiReady) {
    
                const width = 300, height = 150;
                const container = new Container();
                container.width = width;
                container.height = height;


                const WrapperSprite = new Sprite(pixiClass.pixiLoader.resources.TeaserH.texture);
                const text = new Text(teaser1.title, {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
                text.x = 0;
                text.y = 160;
                text.style.wordWrapWidth = width - 10;
                text.style.wordWrap = true;

                if(containerNames.includes(teaser1.id)) return;

                const TEASER_ID = `${teaser1.id}_teaser`;

                pixiClass.loadAsset([{uniqName: TEASER_ID, src: teaser1.imageUrl}], pixiClass.pixiLoaderPool.teaserLoader)
                .then((loader) => {
                    const teaserImgTexture = loader.resources[TEASER_ID].texture;
                    console.log("TEST loader ", loader.resources[TEASER_ID])
                    
                    const TeaserImgSprite = new Sprite(teaserImgTexture);
                    const mask = setSpriteSizeCover(TeaserImgSprite, width, height);

                    container.addChild(WrapperSprite, mask, TeaserImgSprite, text);
                    containerRef.current.push(container);
                    
                    const containerList = [
                        ...containerNames,
                        teaser1.id
                    ];

                    forceRender(containerList);
                });

                
            }
        }, 1000);
    }, [pixiClass.pixiLoader])


    useEffect(() => {
        if(containerRef.current.length > 0) {
            containerRef.current.forEach((container) => {
                container.x = 50;
                container.y = 50;
                pixiClass.pixiApp?.stage.addChild(container);
            })
        }
    }, [containerRef.current.length]);

    return null;
}


export const Playground2 = () => {

    useEffect(() => {
        setTimeout(() => {
            const teaser = getTeaserFrame({
                teaserData: teaser1,
                structure: teaserH_structureData,
                x: 50,
                y: 50
            });

            pixiClass.pixiApp?.stage.addChild(teaser);

        }, 500)
    }, [])

    return null;
}

export default Playground2;