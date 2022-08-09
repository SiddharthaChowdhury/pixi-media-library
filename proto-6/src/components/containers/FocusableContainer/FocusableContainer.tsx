import * as PIXI from "pixi.js-legacy";
import {
  PixiComponent,
  applyDefaultProps,
  _ReactPixi,
} from "@inlet/react-pixi/legacy";
import FocusableContainerOverride from "./focusableContainerOverride";

interface IFocusableContainerProps extends _ReactPixi.IContainer {
  name: string;
  width_orig: number;
  height_orig: number;
  x2?: number;
  y2?: number;
}

const FocusableContainer = PixiComponent("FocusableContainer", {
  create: (props: IFocusableContainerProps) => {
    const newCont = new PIXI.Container() as FocusableContainerOverride;
    newCont.width_orig = props.width_orig;
    newCont.height_orig = props.height_orig;
    newCont.x2 = props.x2 || props.width_orig;
    newCont.y2 = props.y2 || props.height_orig;
    return newCont;
  },
  applyProps: (instance, oldProps, newProps) => {
    applyDefaultProps(instance, oldProps, newProps);
    if (newProps.x || newProps.width_orig) {
      instance.x2 = (newProps.x || oldProps.x || 0) + newProps.width_orig;
    }
    if (newProps.y || newProps.height_orig) {
      instance.y2 = (newProps.y || oldProps.y || 0) + newProps.height_orig;
    }
  },
});

export default FocusableContainer;
