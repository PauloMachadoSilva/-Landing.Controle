import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
    selector: 'more-informations',
    templateUrl: './more-informations.component.html',
    styleUrls: ['./more-informations.component.sass']
})
export class MoreInformationsComponent implements OnInit {

    @Input() public display: string;

    @Output() public closed = new EventEmitter<string>();

    constructor() { }

    ngOnInit() { }

    public closeAll() {
        this.closed.emit();
    }
}
