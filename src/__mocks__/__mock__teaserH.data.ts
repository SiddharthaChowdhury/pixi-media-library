import { ETeaserType, ITeaserInfo } from "../types/teaser.types";

export const teaserHMockData: ITeaserInfo = {
    teaserType: ETeaserType.DEFAULT,
    meta: [
        {
            id: 1,
            title: "This is a pretty large title to check the behavior and do some word wrap as well, This is a pretty large title to check the behavior and do some word wrap as well",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "18",
            duration: "123",
            imageUrl: "https://picsum.photos/id/237/500/300"
        },
        {
            id: 2,
            title: "This is a pretty large ",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "18",
            duration: "320",
            imageUrl: "https://random.imagecdn.app/500/500"
        },
        {
            id: 3,
            title: "This is a pretty large title to check",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "14",
            duration: "78",
            imageUrl: "https://random.imagecdn.app/500/500"
        },
        {
            id: 4,
            title: "This is a pretty large title to check the behavior",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "12",
            duration: "223",
            imageUrl: "https://random.imagecdn.app/500/500"
        }
    ]
};