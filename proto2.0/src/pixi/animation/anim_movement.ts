import { ease } from "pixi-ease";
import appConfig from "../../app-config/appConfig";
import ContainerExtended from "../components/atoms/containerExtended/ContainerExtended";

const anim_movement = {
  moveX: (object: ContainerExtended, x: number) => {
    if (appConfig.animation.power && appConfig.animation.movement)
      ease.add(object, { x }, { duration: 100, ease: "easeOutQuad" });
    else object.x = x;
  },
};

export default anim_movement;
