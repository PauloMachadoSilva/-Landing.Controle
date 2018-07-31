import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';

import { State } from '../../shared/models';
import {
    WzaValidator,
    WzaValidType,
    WzaFormBuilder,
    WzaFormControl
} from './../form';

/**
 * @whatItDoes
 * Generic projeto Form DDD selector, this component get API data and fill form fields
 *
 * @howToUse
 * Use HTML selector: `<form-ddd-selector></form-ddd-selector>`
 *
 * @example
 * ```html
 * <form-ddd-selector defaultState="string" (send)="function($event)"></form-ddd-selector>
 *```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 */
@Component({
    selector: 'form-ddd-selector',
    templateUrl: './ddd-selector.component.html',
    styleUrls: ['./ddd-selector.component.sass']
})
export class FormDddSelectorComponent implements OnInit, OnDestroy {
    public dddForm: FormGroup;

    @Input() public defaultState: string;
    @Input() public defaultDdd: string;
    @Output() public send = new EventEmitter<string>();

    private selectedStateDesc: string;
    private APIDataStateList = Array<State>();

    private _routeSubscription: ISubscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.dddForm = WzaFormBuilder.build([
            { name: 'uf', required: true, value: null },
            { name: 'dddUf',   required: true, value: null }
        ]);

        this._routeSubscription = this._route.data.subscribe((data: { response: Array<State> }) => {
            this.APIDataStateList = data.response;
            this.setSelectState();
        });
    }

    ngOnDestroy() {
        this._routeSubscription.unsubscribe();
    }

    onSubmit() {
        const json = this.dddForm.getRawValue();
        this.defaultState = json.uf;
        this.defaultDdd = json.dddUf;
        json.ufDesc = this.selectedStateDesc;
        this.send.emit(json);
    }

    public updateDDDList(): void {
        let selectDdds = [];
        this.APIDataStateList.forEach(state => {
            if (state.abbr === this.dddForm.controls['uf'].value) {
                this.selectedStateDesc = state.description;
                selectDdds = [];
                state.dddList.forEach(ddd => {
                    selectDdds.push({
                        title: ddd,
                        value: ddd,
                        disabled: false
                    });
                });

                if (this.defaultDdd && state.dddList.indexOf(this.defaultDdd) > -1) {
                    this.dddForm.controls['dddUf'].setValue(this.defaultDdd);
                    this.defaultDdd = null;
                } else {
                    this.dddForm.controls['dddUf'].setValue(selectDdds[0].value);
                }
            }
        });

        (<WzaFormControl>this.dddForm.controls['dddUf']).itens = selectDdds;
    }

    // Private methods declaration

    private setSelectState(): void {
       const selectStates = [];

        this.APIDataStateList.forEach(element => {
            if (element.isSelected) {
                this.dddForm.controls['uf'].setValue(element.abbr);
            }

            selectStates.push({
                title: element.description,
                value: element.abbr,
                disabled: false
            });
        });

        (<WzaFormControl>this.dddForm.controls['uf']).itens = selectStates;

        if (this.defaultState) {
            this.dddForm.controls['uf'].setValue(this.defaultState);
        }
        this.updateDDDList();
    }
}
