import { Container } from "pixi.js";

class ContainerExtended extends Container {
  public widthVirtual?: number; // this has no effect but only information that can be used
  public heightVirtual?: number;
  public spaceBetweenItems?: number;
}

export default ContainerExtended;
