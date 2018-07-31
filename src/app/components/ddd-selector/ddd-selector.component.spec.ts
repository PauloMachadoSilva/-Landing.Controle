import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDddSelectorComponent } from './ddd-selector.component';

describe('FormDddSelectorComponent', () => {
        let component: FormDddSelectorComponent;
        let fixture: ComponentFixture<FormDddSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FormDddSelectorComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDddSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
