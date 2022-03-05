import { useEffect, useRef } from "react";
import withHtmlToImg, { IWithHtmlToImgProps } from "../../hooks/withHtmlToImg";

const componentId = "TeaserH";

const TeaserH = ({generateImage}: IWithHtmlToImgProps) => {
    const refDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(refDiv.current === null) return;

        generateImage(refDiv.current, componentId);
    }, [refDiv]);

    return (
        <div 
            ref={refDiv}
            style={{
                width: '300px',
                height: '200px',
                borderRadius: '10px',
                border: '1px solid silver',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            hello teaser
        </div>
    )
}

export default withHtmlToImg(TeaserH);