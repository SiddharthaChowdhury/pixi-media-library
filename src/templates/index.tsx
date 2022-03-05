import TeaserH from "./teaserH/TeaserH";
import TeaserV from "./teaserV/TeaserV";

const templates = [
    TeaserH,
    TeaserV
];

const Templates = () => {
    return (
        <div style={{width: '0px', height: '0px'}}>
            <TeaserH/>
            <TeaserV/>
        </div>
    )
}

export default Templates