import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: "photo-cell-edit",
  template: `<nb-form-field>
                        <input nbInput
                               fullWidth
                               placeholder="URL"
                               [(ngModel)]="cell.newValue" />
                        <button nbSuffix
                                nbButton
                                ghost
                                (image-select)="cell.newValue=$event"
                                title="Select Image"
                                type="button">
                            <nb-icon icon="image-outline" pack="eva"></nb-icon>
                        </button>
                    </nb-form-field>`,
})
export class PhotoCellEditComponent extends DefaultEditor implements OnInit {
  ngOnInit() {
    this.cell.newValue = this.cell.getValue() || null;
  }
}
