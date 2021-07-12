import { Component, Input, OnInit } from "@angular/core";
import {
  NbToastrService,
} from "@nebular/theme";
import { LocalDataSource } from 'ng2-smart-table';
import { Testimonial } from '../../../@core/models/settings/testimonial';
import { ConfirmObject } from '../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, photoColumn, stringColumn } from '../../../@core/models/smartTable/inlineTableSettings';
import { OrderAdditionalActionComponent } from '../../../@common/components/table/orderAdditionalAction.component';
import { EmptyCellEditComponent } from '../../../@common/components/table/emptyCellEditorComponent';
import { PageComponent } from '../../../@core/models/settings/appearance/pageComponent';

interface Step {
  title: string;
  text: string;
}

@Component({
  selector: "ngx-steps-page-component",
  templateUrl: "./steps.component.html",
  styleUrls: ["./steps.component.scss"],
})
export class StepsPageComponentComponent implements OnInit {
  @Input() component: PageComponent

  stepsDataSource = new LocalDataSource();
  tableSettings = {};

  constructor(
    private toastrService: NbToastrService,
  ) {
    const self = this;
    this.tableSettings = defaultInlineTableSettings({
      title: stringColumn('Title', undefined, true),
      text: {
        ...stringColumn('Text', undefined, true),
        editor: {
          type: 'textarea'
        }
      },
      action: {
        type: 'custom',
        filter: false,
        editor: {
          type: 'custom',
          component: EmptyCellEditComponent
        },
        renderComponent: OrderAdditionalActionComponent,
        onComponentInitFunction(instance: OrderAdditionalActionComponent<Testimonial>) {
          instance.setArray('steps', self.component.values);
          instance.down.subscribe((row) => {
            const index = self.component.values.steps.indexOf(row);
            if (index === self.component.values.steps.length - 1) return;

            self.component.values.steps.splice(index + 1, 0, self.component.values.steps.splice(index, 1)[0]);
            self.stepsDataSource.load(self.component.values.steps);
          });
          instance.up.subscribe((row) => {
            const index = self.component.values.steps.indexOf(row);
            if (index === 0) return;

            self.component.values.steps.splice(index - 1, 0, self.component.values.steps.splice(index, 1)[0]);
            self.stepsDataSource.load(self.component.values.steps);
          });
        },
      }
    });
  }

  ngOnInit(): void {
    this.component.values.steps = this.component.values.steps || [];
    createLocalDataSource(this.stepsDataSource, this.component.values, 'steps');
  }

  confirm = ($event: ConfirmObject<Step>) => {
    if (!$event.data && $event.source.data.length >= 4) {
      this.toastrService.danger('Maximum 4 steps are allowed.', 'Error!');
      $event.confirm.reject();
    }

    const errors: string[] = [];
    if (!$event.newData.title) {
      errors.push('Title is required.')
    }

    if (!$event.newData.text) {
      errors.push('Text is required.')
    }

    if (errors.length > 0) {
      this.toastrService.danger(errors.join('\n'), 'Error!');
      $event.confirm.reject();
    } else {
      $event.confirm.resolve($event.newData);
    }
  }
}
