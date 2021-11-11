import { Component, OnInit, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DefaultFilter } from 'ng2-smart-table';
import { distinctUntilChanged, debounceTime, skip } from 'rxjs/operators';

@Component({
    template: `
    <select [ngClass]="inputClass"
            class="form-control"
            #inputControl
            [(ngModel)]="query">
        <option value="">{{ column.getFilterConfig().selectText }}</option>
        <option *ngFor="let option of column.getFilterConfig().list" [ngValue]="option.value">
          {{ option.title }}
        </option>
    </select>
  `,
})
export class SelectFilterWithNullOptionComponent extends DefaultFilter implements OnInit {

    @ViewChild('inputControl', { read: NgControl, static: true }) inputControl: NgControl;

    constructor() {
        super();
    }

    ngOnInit() {
        this.inputControl.valueChanges
            .pipe(
                skip(1),
                distinctUntilChanged(),
                debounceTime(this.delay)
            )
            .subscribe((value: string) => this.setFilter());
    }
}