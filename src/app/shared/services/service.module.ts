import { NgModule } from '@angular/core';

import {
    APIAddressService,
    APIConfigService,
    APIPlanService,
    APIQuestionService,
    ConstantsService,
    DebuggerService,
    HttpAPIMockService,
    HttpAPIService,
    HttpService
} from '.';

@NgModule({
    providers: [
        APIAddressService,
        APIConfigService,
        APIPlanService,
        APIQuestionService,
        ConstantsService,
        DebuggerService,
        HttpAPIMockService,
        HttpAPIService,
        HttpService
    ]
})

export class ServiceModule { }
