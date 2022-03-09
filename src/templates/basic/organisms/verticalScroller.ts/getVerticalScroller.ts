import { Container } from "pixi.js";

interface IVerticalScroller {
    name: string;
    x: number;
    y: number;
}

const getVerticalScroller = (props: IVerticalScroller) => {
    const vc = new Container();
    vc.name = `${props.name}_VC`

    return vc;
}

export default getVerticalScroller;