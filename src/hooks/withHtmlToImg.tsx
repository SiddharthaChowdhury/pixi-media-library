import { toPng } from 'html-to-image';
import React from 'react';
import { assetLoaderCollector$ } from '../pixi/helpers/__$AssetLoad';

export interface IWithHtmlToImgProps {
  generateImage: (div: HTMLDivElement, componentId: string) => void
}

const withHtmlToImg = (Component: React.FC<any>) => ({ ...props }) => {
  const [isConverted, setIsConverted] = React.useState(false);

  const generateImage = (div: HTMLDivElement, componentId: string) => {
    if(div === null) return;

    toPng(div, { cacheBust: true, }).then((dataUrl) => {
        if(dataUrl) {
          setIsConverted(true);
          
          assetLoaderCollector$.next({
            uniqName: componentId,
            src: dataUrl
          })
        }
    })
    .catch((err) => {
        console.log(err)
    })
  }

  if(isConverted) return null;

  return (
    <Component {...props} generateImage={generateImage} />
  )
};

export default withHtmlToImg