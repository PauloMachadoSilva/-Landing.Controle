import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgxCarouselModule } from 'ngx-carousel';

import { ComponentsModule } from './../../components/components.module';
import { HomePageComponent } from './home-page.component';
import { FormDDDResolve } from './../../components/ddd-selector/form-ddd-selector.resolver';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        resolve: { response: FormDDDResolve },
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        NgxCarouselModule,

        CommonModule,
        ComponentsModule
    ],
    declarations: [
        HomePageComponent
    ]
})

export class HomePageModule { }

