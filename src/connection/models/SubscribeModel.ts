

import {MailChimpInterest} from "../constants/MailChimpInterest";


export class SubscribeModel { constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public interest: MailChimpInterest
) {}}