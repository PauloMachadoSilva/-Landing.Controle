export interface PlanInterface {
    name: string;
    title: string;
    subTitle: string;
    skuCode: string;
    complement: any;
    completeName: string;
    description: any;
    maxDependents: number;
    maxFreeDependents: number;
    price: string;
    order: number;
}

class Plan implements PlanInterface {
    public name: string;
    public title: string;
    public subTitle: string;
    public skuCode: string;
    public complement: any;
    public completeName: string;
    public description: any;
    public price: string;
    public maxDependents: number;
    public maxFreeDependents: number;
    public order: number;

    constructor(
        json: PlanInterface,
        objectBuilder?: boolean
    ) {
        this.name = json.name;
        this.title = json.title;
        this.subTitle = json.subTitle;
        this.skuCode = json.skuCode;
        this.complement = json.complement;
        this.completeName = json.completeName;
        this.description = json.description;
        this.maxDependents = json.maxDependents;
        this.maxFreeDependents = json.maxFreeDependents;
        this.price = json.price;
        this.order = json.order;
    }
}

export default Plan;
