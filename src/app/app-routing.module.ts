import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

const ROUTES: Routes = [];

const useLazyLoading = true;

const PRELOAD_STRATEGY = {
    preloadingStrategy: useLazyLoading ? null : PreloadAllModules
};

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, PRELOAD_STRATEGY)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
