import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Service } from '../../shared/models';

@Component({
    selector: 'service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.sass']
})
export class ServiceComponent implements OnInit {

    @Input() public service: Service;

    constructor() { }

    ngOnInit() { }
}
