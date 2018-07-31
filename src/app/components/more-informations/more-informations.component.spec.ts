import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInformationsComponent } from './more-informations.component';

describe('MoreInformationsComponent', () => {
    let component: MoreInformationsComponent;
    let fixture: ComponentFixture<MoreInformationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MoreInformationsComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MoreInformationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
