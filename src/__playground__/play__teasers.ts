import { Container, Sprite, Texture } from "pixi.js";

// const PlayTeaser = () => {
//     const container = new Container();
// }

class PlayTeaserContainer {
    public container = new Container();

    constructor(textures: Texture[]) {
        textures.forEach((texture) => {
            this.container.addChild(new Sprite(texture))
        });
    }
}