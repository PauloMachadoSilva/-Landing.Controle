import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Plan } from '../../shared/models';

/**
 * @whatItDoes
 * Generic projeto  Plan Details Component used to make a Plan Details structure
 *
 * @howToUse
 * Use HTML selector: `<-plan-details>content</-plan-details>`
 *
 * @example
 * ```html
 * <-plan-details></-plan-details>
 * ```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 */
@Component({
    selector: 'plan-card',
    templateUrl: './plan-card.component.html',
    styleUrls: ['./plan-card.component.sass']
})
export class PlanCardComponent implements OnInit {

    @Input() public index: number;
    @Input() public plan: Plan;
    @Output() public send = new EventEmitter<string>();
    @Output() public openInfo = new EventEmitter<string>();

    public detailList: Array<string>;
    public infoList: Array<string>;

    public openned = false;
    public showDetails = false;

    constructor() { }

    ngOnInit() {
        this.detailList = [];
        Object.keys(this.plan.description).forEach(key => {
            if (key !== 'sva') {
                this.detailList.push(this.plan.description[key].title + ' ' + this.plan.description[key].description);
            }
        });
    }

    onOpenPlan() {
        this.openInfo.emit();
    }

    onSubmit() {
        this.send.emit(this.plan.skuCode);
    }
}
