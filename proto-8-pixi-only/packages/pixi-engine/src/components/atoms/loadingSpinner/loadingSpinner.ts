import * as PIXI from "pixi.js-legacy";

export const loadingSpinner = (size = 30) => {
  const spinner = new PIXI.Graphics();

  let percent = 0;
  let animationRequestId = 0;

  function animate() {
    spinner.rotation += 0.12;
    spinner
      .clear()
      .lineStyle(4, 0xc0c0c0, 1)
      .moveTo(size, 0)
      .arc(0, 0, size, 0, Math.PI * 2 * percent, false);
    percent = Math.abs(Math.sin(Date.now() / 1000));
    animationRequestId = window.requestAnimationFrame(animate);
  }

  const kill = () => {
    window.cancelAnimationFrame(animationRequestId);
    spinner.destroy();
  };

  const putInsideContainer = (
    container: PIXI.Container,
    pos: { x: number; y: number }
  ) => {
    spinner.pivot.x = spinner.width / 2;
    spinner.pivot.y = spinner.height / 2;

    container.addChild(spinner);

    spinner.x = pos.x;
    spinner.y = pos.y;
  };

  return {
    spinner,
    showSpinner: animate,
    stopSpinner: kill,
    putInsideContainer,
  };
};
