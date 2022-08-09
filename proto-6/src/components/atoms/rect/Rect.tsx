import React, { useCallback } from "react";
import * as PIXI from "pixi.js-legacy";
import { ERectBorderRadiusType, IRectProps } from "./types";
import { Graphics } from "@inlet/react-pixi/legacy";

const Rect = (props: IRectProps) => {
  const getRoundedRect = useCallback(
    (g: PIXI.Graphics) => {
      const {
        x,
        y,
        name,
        width,
        height,
        borderRadius,
        borderRadiusSide,
        fillColor,
      } = props;
      g.clear();

      g.beginFill(
        PIXI.utils.string2hex(fillColor || "#ffffff"),
        fillColor ? 1 : 0
      );

      if (props.borderWidth && props.borderColor)
        g.lineStyle(
          props.borderWidth,
          PIXI.utils.string2hex(props.borderColor)
        );

      if (
        borderRadius &&
        (!borderRadiusSide ||
          (borderRadiusSide && borderRadiusSide === "all-default"))
      ) {
        g.drawRoundedRect(x, y, width, height, borderRadius);
      } else {
        g.drawRect(x, y, width, height);
      }

      g.endFill();
      if (name) g.name = name;
    },
    [props]
  );

  const getRoundedHalfRectTop = useCallback(
    (g: PIXI.Graphics) => {
      const {
        width,
        height,
        x,
        y,
        borderRadius,
        borderColor,
        borderWidth = 0,
        name,
        fillColor,
      } = props;

      const curve = borderRadius!;

      g.clear();
      if (name) g.name = name;

      if (borderWidth && borderColor) {
        g.lineStyle(borderWidth, PIXI.utils.string2hex(borderColor));
      }

      g.beginFill(
        PIXI.utils.string2hex(fillColor || "#ffffff"),
        fillColor ? 1 : 0
      );

      g.moveTo(curve, 0);
      g.lineTo(width - curve, 0);
      g.arcTo(width, 0, width, curve, curve);
      g.lineTo(width, height);
      g.lineTo(0, height);
      g.lineTo(0, curve);
      g.arcTo(0, 0, curve, 0, curve);

      g.closePath();

      g.endFill();
      g.x = x;
      g.y = y;
    },
    [props]
  );

  const getRoundedHalfRectBottom = useCallback(
    (g: PIXI.Graphics) => {
      const {
        width,
        height,
        x,
        y,
        borderRadius,
        borderColor,
        borderWidth = 0,
        fillColor,
        name,
      } = props;

      const curve = borderRadius!;

      g.clear();
      if (name) g.name = name;

      if (borderWidth && borderColor) {
        g.lineStyle(borderWidth, PIXI.utils.string2hex(borderColor));
      }

      g.beginFill(
        PIXI.utils.string2hex(fillColor || "#ffffff"),
        fillColor ? 1 : 0
      );

      g.lineTo(width, 0); //[top-line] to direction [x-changeToWidth, y-noChange]
      g.lineTo(width, height - curve); //[right-line] to direction [x-noChange, y-changeToHeight]
      g.arcTo(width, height, width - curve, height, curve);
      g.lineTo(curve, height);
      g.arcTo(0, height, 0, height - curve, curve);
      g.lineTo(0, 0);
      g.closePath();

      g.endFill();
      g.x = x;
      g.y = y;

      return g;
    },
    [props]
  );

  const draw = React.useCallback(
    (graphic) => {
      if (!props.borderRadius) {
        getRoundedRect(graphic);
        return;
      }
      switch (props.borderRadiusSide) {
        case ERectBorderRadiusType.TOP_CORNERS:
          getRoundedHalfRectTop(graphic);
          break;
        case ERectBorderRadiusType.BOTTOM_CORNERS:
          getRoundedHalfRectBottom(graphic);
          break;
        default:
          getRoundedRect(graphic);
          break;
      }
    },
    [
      getRoundedHalfRectBottom,
      getRoundedHalfRectTop,
      getRoundedRect,
      props.borderRadius,
      props.borderRadiusSide,
    ]
  );

  return <Graphics draw={draw} x={props.x} y={props.y} />;
};

export default Rect;
