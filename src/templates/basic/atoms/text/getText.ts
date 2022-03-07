import * as PIXI from "pixi.js";

interface IRectRoundedCornerProps {
  text: string;
  textStyle: Partial<PIXI.ITextStyle>;
  maxLineEllipsis?: number;
}

export const getText = (options: IRectRoundedCornerProps) => {
  const ellipsis = (
    text: string,
    style: Partial<PIXI.ITextStyle>,
    maxLines: number
  ) => {
    const { wordWrapWidth } = style;

    if (!wordWrapWidth) return text;

    const pixiStyle = new PIXI.TextStyle(style);
    const { lines } = PIXI.TextMetrics.measureText(text, pixiStyle);
    let newText = text;
    
    if (lines.length > maxLines) {
      const truncatedLines = lines.slice(0, maxLines);
      const lastLine = truncatedLines[truncatedLines.length - 1];
      const words = lastLine.split(" ");
      const wordMetrics = PIXI.TextMetrics.measureText(
        `\u00A0\n...\n${words.join("\n")}`,
        pixiStyle
      );
      const [spaceLength, dotsLength, ...wordLengths] = wordMetrics.lineWidths;
      const { text: newLastLine } = wordLengths.reduce(
        (data, wordLength, i) => {
          if (data.length + wordLength + spaceLength >= wordWrapWidth) {
            return { ...data, length: wordWrapWidth };
          }
          return {
            text: `${data.text}${i > 0 ? " " : ""}${words[i]}`,
            length: data.length + wordLength + spaceLength,
          };
        },
        { text: "", length: dotsLength }
      );
      truncatedLines[truncatedLines.length - 1] = `${newLastLine}...`;
      newText = truncatedLines.join("\n");
    }
    return newText;
  };

  const text: string = options.maxLineEllipsis
    ? ellipsis(options.text, options.textStyle, options.maxLineEllipsis)
    : options.text;
  const label = new PIXI.Text(text, options.textStyle);

  return label;
};
