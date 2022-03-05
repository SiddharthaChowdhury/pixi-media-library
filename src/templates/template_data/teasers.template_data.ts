import { ITeaserStructure } from "../../types/teaser.types";

export const teaserH_structureData: ITeaserStructure = {
    boxDiam: {
        width: "400px",
        height: "250px",
        border: "2px solid green",
        borderRadius: {
            borderRadius: "10px"
        }
    },
    parts: [
        {
            name: "TEASER_IMAGE_SECTION",
            top: "0px",
            left: "0px",
            width: "400px",
            height: "200px",
            backgroundColor: "cyan",
            borderRadius: {
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px"
            }
        },

        {
            name: "TEASER_DESC",
            top: "200px",
            left: "0px",
            width: "400px",
            height: "50px",
            backgroundColor: "grey",
            borderRadius: {
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px"
            }
        },
    ]

}