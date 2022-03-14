import { ETeaserType, ITeaserInfo } from "../templates/basic/molecules/teaser/types";

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
            title: "This is a pretty small ",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "18",
            duration: "320",
            imageUrl: `https://picsum.photos/500/500?random=${ Math.floor(Math.random() * 20) + 1}`
        },
        {
            id: 3,
            title: "This is a pretty large title to check",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "14",
            duration: "78",
            imageUrl: `https://picsum.photos/500/500?random=${ Math.floor(Math.random() * 20) + 1}`
        },
        {
            id: 4,
            title: "This is a pretty large title to check the behavior",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "12",
            duration: "223",
            imageUrl: `https://picsum.photos/500/500?random=${ Math.floor(Math.random() * 20) + 1}`
        },
        {
            id: 5,
            title: "This is a pretty large title to check the behavior",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "8",
            duration: "223",
            imageUrl: `https://picsum.photos/500/500?random=${ Math.floor(Math.random() * 20) + 1}`
        },
        {
            id: 6,
            title: "This is a pretty large title to check the behavior",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "14",
            duration: "223",
            imageUrl: `https://picsum.photos/500/500?random=${ Math.floor(Math.random() * 20) + 1}`
        },
        {
            id: 7,
            title: "This is a pretty large title to check the behavior",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "18",
            duration: "223",
            imageUrl: `https://picsum.photos/500/500?random=${ Math.floor(Math.random() * 20) + 1}`
        },
        {
            id: 8,
            title: "This is a pretty large title to check the behavior",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "12",
            duration: "223",
            imageUrl: `https://picsum.photos/500/500?random=${ Math.floor(Math.random() * 20) + 1}`
        },
        {
            id: 9,
            title: "This is a pretty large title to check the behavior",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "10",
            duration: "223",
            imageUrl: `https://picsum.photos/500/500?random=${ Math.floor(Math.random() * 20) + 1}`
        },
        {
            id: 10,
            title: "This is a pretty large title to check the behavior",
            description: "Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold. Long long description to check the amount of data the description box can hold.",
            fsk: "12",
            duration: "223",
            imageUrl: `https://picsum.photos/500/500?random=1${ Math.floor(Math.random() * 20) + 1}`
        }

    ]
};