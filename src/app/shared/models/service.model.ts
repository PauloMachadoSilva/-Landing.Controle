
export interface ServiceInterface {
    title: string;
    descriptionList: Array<string>;
    icon: string;
    link: string;
}

export class Service implements ServiceInterface {
    public title: string;
    public descriptionList: Array<string>;
    public icon: string;
    public link: string;

    constructor(
        json: ServiceInterface
    ) {
        this.title = json.title;
        this.descriptionList = json.descriptionList;
        this.icon = json.icon;
        this.link = json.link;
    }
}

export class ServiceData {
    digitalServiceList: Array<Service>;
    warnMessage: string;
    policyLink: string;
}
