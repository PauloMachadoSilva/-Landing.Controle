import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';

import { APIQuestionService, APIPlanService, ConstantsService } from './../../shared/services';
import { Question, ServiceData, Plan } from '../../shared/models';

declare const WzaModal: any;

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.sass',
                './home-page.component.question.sass'
            ]
})
export class HomePageComponent implements OnInit {

    public title: string;
    public planList: Array<Plan>;
    public featuredPlan: Plan;
    public serviceData: ServiceData;
    public questionList: Array<Question>;
    public showPopup: string;

    public phoneNumber: string;
    public showDddModal = false;
    public currentStateDesc: string;
    public currentState: string;
    public currentDdd: number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _constants: ConstantsService,
        private _apiPlan: APIPlanService,
        private _apiQuestion: APIQuestionService
    ) {
        this.title = this._constants.client.title;
        this.phoneNumber = this._constants.client.phone;
        this.currentStateDesc = 'Rio de Janeiro';
        this.currentState = 'RJ';
        this.currentDdd = 21;
    }

    ngOnInit() {
        this.setPlanList();
        this.setServiceData();
        this.setQuestionList();
    }

    openPlan(sku: string) {
        const params = {
            sku: sku,
            uf: this.currentState,
            ddd: this.currentDdd,
            plataform: '',
            query_string: 'trk_source=lp_controle_vivo'
        };

        WzaModal.open('modal_vivo_controle', params);
    }

    public openInfo() {
        this.showPopup = 'info';
    }

    public onDddSend(data: any) {
        this.currentState = data.uf;
        this.currentDdd = data.dddUf;
        this.currentStateDesc = data.ufDesc;

        this.showDddModal = false;

        this.setPlanList();
    }

    private async setPlanList() {
        this.planList = await this._apiPlan.getPlanByDDDList(
                                                this.currentDdd,
                                                this._constants.client.plans.productId,
                                                this._constants.client.plans.modality
                                            );
        this.setFeaturedPlan();
    }

    private setFeaturedPlan() {
        this.planList.forEach((plan) => {
            if (plan.order === 0) {
                this.featuredPlan = plan;
            }
        });

        // @todo LP - Remover o Mock!!!!
        // @todo LP - Coloquei apenas para testar 1 plano que contivesse 5,5GB no layout
        this.featuredPlan = this.planList[0];
    }

    private async setServiceData() {
        this.serviceData = new ServiceData();
        this.serviceData = await this._apiPlan.getServiceData();
    }

    private async setQuestionList() {
        this.questionList = await this._apiQuestion.getQuestionList();
    }
}
