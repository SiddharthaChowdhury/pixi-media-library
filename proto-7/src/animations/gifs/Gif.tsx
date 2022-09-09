import React from "react";
import { Group, Image } from "react-konva";

interface IGifProps {
  src: string;
}

const GIF = ({ src }: IGifProps) => {
  const imageRef = React.useRef<any>(null);
  const canvas = React.useMemo(() => {
    const node = document.createElement("canvas");
    return node;
  }, []);

  React.useEffect(() => {
    if (!imageRef.current) return;
    // save animation instance to stop it on unmount
    let anim: any;
    // @ts-ignore
    window.gifler(src).get((a) => {
      anim = a;
      anim.animateInCanvas(canvas);
      anim.onDrawFrame = (ctx: any, frame: any) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);

        if (imageRef.current) {
          console.log(">>>>>> parentGroup");
        }

        // const parentGroup = imageRef.current.getParent();
        // parentGroup.draw();
      };
    });
    return () => anim && anim.stop();
  }, [src, canvas, imageRef]);

  return (
    <Group>
      <Image image={canvas} ref={imageRef} />
    </Group>
  );
};

export default GIF;
