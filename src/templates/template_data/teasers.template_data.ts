import { ETeaserPartname, ITeaserStructure } from "../../types/teaser.types";

export const teaserDefault_structureData: ITeaserStructure = {
    boxDiam: {
        name: ETeaserPartname.TEASER_FRAME,
        width: 400,
        height: 250,
        borderWidth: 2,
        borderColor: 0x5DADE2,
        borderRadius: 10,
        backgroundColor: 0x27AE60
    },
    parts: [
        {
            structureType: 'roundedRect_top',
            name: ETeaserPartname.IMAGE,
            top: 0,
            left: 0,
            width: 400,
            height: 200,
            backgroundColor: 0x5DADE2,
            borderRadius:10,
            parts:[
                {
                    structureType: 'text',
                    name: ETeaserPartname.TITLE,
                    top: 10,
                    left: 10,
                    width: 380,
                    height: 50,
                    fontSize: 18,
                    fontFamily: 'Arial',
                    fontColor: 0xff1010,
                    textAlign: 'left'

                    // backgroundColor: 0xE74C3C,
                }
            ],
        },

        {
            structureType: 'roundedRect_bot',
            name: ETeaserPartname.DESC,
            top: 200,
            left: 0,
            width: 400,
            height: 50,
            backgroundColor: 0x808B96,
            borderRadius:10
        },
    ]

}