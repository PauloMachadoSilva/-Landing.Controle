import { MoreInformationsComponent } from './more-informations/more-informations.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WzaFormModule } from './form/wza-form.module';
import { FormDddSelectorComponent } from './ddd-selector/ddd-selector.component';
import { ServiceComponent } from './service/service.component';

import { PlanCardComponent } from './plan-card/plan-card.component';
import { FormDDDResolve } from './ddd-selector/form-ddd-selector.resolver';

@NgModule({
    imports: [
        CommonModule,
        WzaFormModule
    ],
    declarations: [
        FormDddSelectorComponent,
        MoreInformationsComponent,
        PlanCardComponent,
        ServiceComponent
    ],
    exports: [
        FormDddSelectorComponent,
        MoreInformationsComponent,
        PlanCardComponent,
        ServiceComponent
    ],
    providers: [
        FormDDDResolve
    ]
})
export class ComponentsModule { }
