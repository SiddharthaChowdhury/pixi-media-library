import { useEffect, useRef } from "react";
import withHtmlToImg, { IWithHtmlToImgProps } from "../../hooks/withHtmlToImg";

const componentId = "TeaserV";

const TeaserV = ({generateImage}: IWithHtmlToImgProps) => {
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
                height: '400px',
                borderRadius: '10px',
                border: '1px solid green',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            hello teaser V
        </div>
    )
}

export default withHtmlToImg(TeaserV);