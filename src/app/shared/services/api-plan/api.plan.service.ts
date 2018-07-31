import { Injectable } from '@angular/core';

import { APIConfigService } from '../config/apiConfig.service';
import { HttpAPIService } from './../http/http.api.service';
import { HttpAPIMockService } from './../http/http.api.mock.service';
import { PlanResponse, ServiceResponse, DigitalServiceResponse, PlansResponse, PlanData } from './api.plan.service.interfaces';
import { JsonParser } from '../../utils';
import { Plan, Service, ServiceData } from '../../models';

@Injectable()
export class APIPlanService {
    constructor(
        private _httpMockService: HttpAPIMockService,
        private _urlConfigService: APIConfigService,
        private _httpAPIService: HttpAPIService
    ) {
    }

    public async getServiceData(): Promise<ServiceData> {
        const response = await this._httpMockService.get<DigitalServiceResponse>('DIGITAL_SERVICE_GET_LIST', {});

        const serviceData = new ServiceData();

        serviceData.digitalServiceList = new Array<Service>();
        response.digitalServiceList.forEach(element => {
            serviceData.digitalServiceList.push(new Service({
                title: element.title,
                descriptionList: element.description,
                icon: element.icon,
                link: element.link
            }));
        });

        serviceData.policyLink = response.policyLink;
        serviceData.warnMessage = response.warnMessage;

        return serviceData;
    }

    public async getPlanByDDDList(ddd: number, productId: number, typeMode: number): Promise<Array<Plan>> {

        const params = {
            DDD: ddd,
            IdProduto: productId,
            ModalidadeTipo: typeMode
        };

        const response = await this._httpAPIService.get<PlansResponse>('PLANS_SERVICE_PLAN_BY_DDD_LIST', params);

        const planList = new Array<Plan>();
        response.Skus.forEach(element => {
            planList.push(this.planByPlanData(element));
        });

        //return planList.reverse()
        return planList.reverse().filter(plan => plan.description.bonus != null);
        ;
    }

    public async getPlanBySku(sku: string): Promise<Plan> {
        const params = {
            CodigoSku: sku
        };

        const response = await this._httpAPIService.get<PlanResponse>('PLANS_SERVICE_PLAN_BY_SKU', params);

        return (!response.Sku) ? null : this.planByPlanData(response.Sku);
    }

    public async getPlanBySkuUfDdd(sku: string, uf: string, ddd: string, view: string, idSession: string): Promise<Plan> {
        const params = {
            Sku: sku,
            ddd,
            Uf: uf,
            view: view,
            uidSession: idSession
        };

        const response = await this._httpAPIService.get<PlanResponse>('PLANS_SERVICE_PLAN_BY_SKU_UF_DDD', params);

        return (!response.retorno) ? null : this.planByPlanData(response.retorno);
    }

    private planByPlanData(element: PlanData): Plan {
        const complement = (typeof element.Complemento === 'string')
                                ? element.Complemento
                                : JsonParser.toString(element.Complemento);
        const plan = new Plan({
            complement: this.makeJson(complement),
            title: '',
            subTitle: '',
            completeName: element.NomeCompleto,
            description: this.makeJson(element.Descricao),
            maxDependents: element.MaximoDependentes,
            maxFreeDependents: element.MaximoDependentesGratis,
            name: element.Nome,
            price: element.Valor,
            skuCode: element.CodigoSku,
            order: element.Ordem
        }, false);

        // Mocked
        plan.title = plan.complement.internetValue;
        plan.subTitle = (plan.description.bonus)
                            ? plan.description.bonus.title
                            : 'de internet 4G';

        return plan;
    }

    private makeJson(element: string): any {
        const translate = [
            ['ligacoes', 'calls'],
            ['titulo', 'title'],
            ['descricao', 'description'],
            ['dados_valor', 'internetValue'],
            ['ddd_descricao', 'dddDescription'],
            ['ddd_valor', 'dddValue'],
            ['minutos_offnet_descricao', 'minuteOfflineDescription'],
            ['minutos_offnet_valor', 'minuteOfflineValue'],
            ['minutos_onnet_descricao', 'minuteOnlineDescription'],
            ['minutos_onnet_valor', 'minuteOnlineValue'],
            ['sms_descricao', 'smsDescription'],
            ['sms_valor', 'smsValue']
        ];

        translate.forEach( item => element = element.replace(new RegExp('"' + item[0] + '":', 'g'), '"' + item[1] + '":') );
        return JsonParser.fromString(element);
    }
}
