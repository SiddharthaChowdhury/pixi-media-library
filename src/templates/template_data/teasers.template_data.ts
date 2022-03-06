import { ITeaserStructure } from "../../types/teaser.types";

export const teaserH_structureData: ITeaserStructure = {
    boxDiam: {
        name: 'TEASER_BOX',
        width: 400,
        height: 250,
        borderWidth: 2,
        borderColor: 0x5DADE2,
        borderRadius: 40,
        backgroundColor: 0x27AE60
    },
    parts: [
        {
            structureType: 'roundedRect',
            name: "TEASER_IMAGE_SECTION",
            top: 0,
            left: 0,
            width: 400,
            height: 200,
            backgroundColor: 0x5DADE2,
            borderRadius: [10, 10, 0, 0],
            parts:[
                {
                    structureType: 'rect',
                    name: "TEASER_TITLE",
                    top: 10,
                    left: 10,
                    width: 380,
                    height: 50,
                    backgroundColor: 0xE74C3C,
                }
            ],
        },

        {
            structureType: 'roundedRect',
            name: "TEASER_DESC",
            top: 200,
            left: 0,
            width: 400,
            height: 50,
            backgroundColor: 0x808B96,
            borderRadius: [0, 0, 10, 10]
        },
    ]

}