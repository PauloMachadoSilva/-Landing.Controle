import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageModule } from './home-page/home-page.module';
import { GlobalErrorHandler } from '../shared/error-handler/GlobalErrorHandler';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        HomePageModule
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ]
})

export class PageModule { }

