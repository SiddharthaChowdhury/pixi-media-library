import { ETeaserType, ITeaserInfo } from "../types/teaser.types";

export const teaserHMockData: ITeaserInfo[] = [
    {
        title: "This is a pretty large title to check the behavior",
        teaserType: ETeaserType.TEASER_H,
        description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
        fsk: "18",
        duration: "123",
        imageUrl: "https://random.imagecdn.app/500/500"
    },
    {
        title: "This is a pretty large ",
        teaserType: ETeaserType.TEASER_H,
        description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
        fsk: "18",
        duration: "320",
        imageUrl: "https://random.imagecdn.app/500/500"
    },
    {
        title: "This is a pretty large title to check",
        teaserType: ETeaserType.TEASER_H,
        description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
        fsk: "14",
        duration: "78",
        imageUrl: "https://random.imagecdn.app/500/500"
    },
    {
        title: "This is a pretty large title to check the behavior",
        teaserType: ETeaserType.TEASER_H,
        description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
        fsk: "12",
        duration: "223",
        imageUrl: "https://random.imagecdn.app/500/500"
    }
];