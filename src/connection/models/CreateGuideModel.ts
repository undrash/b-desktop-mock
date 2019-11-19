
import {GuideType} from "../constants/GuideType";



export class CreateGuideModel { constructor(
    public type: GuideType,
    public flow: string,
    public index: number
) {}}
