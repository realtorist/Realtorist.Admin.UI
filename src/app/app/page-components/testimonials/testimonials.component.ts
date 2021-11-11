import { Component, Input, OnInit } from "@angular/core";
import {
  NbToastrService,
} from "@nebular/theme";
import { LocalDataSource } from 'ng2-smart-table';
import { Testimonial } from '../../../@core/models/settings/testimonial';
import { ConfirmObject } from '../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, photoColumn, stringColumn } from '../../../@core/models/smartTable/inlineTableSettings';
import { OrderAdditionalActionComponent } from '../../../@common/components/table/orderAdditionalAction.component';
import { EmptyCellEditComponent } from '../../../@common/components/table/emptyCellEditorComponent.component';
import { PageComponent } from '../../../@core/models/settings/appearance/pageComponent';

@Component({
  selector: "ngx-testimonials-page-component",
  templateUrl: "./testimonials.component.html",
  styleUrls: ["./testimonials.component.scss"],
})
export class TestimonialsPageComponentComponent implements OnInit {
  @Input() component: PageComponent

  testimonialsDataSource = new LocalDataSource();
  tableSettings = {};

  constructor(
    private toastrService: NbToastrService,
  ) {
    const self = this;
    this.tableSettings = defaultInlineTableSettings({
      name: stringColumn('Author name', undefined, true),
      title: stringColumn('Author title', undefined, true),
      photo: photoColumn('Photo URL', true),
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
          instance.setArray('testimonials', self.component.values);
          instance.down.subscribe((row) => {
            const index = self.component.values.testimonials.indexOf(row);
            if (index === self.component.values.testimonials.length - 1) return;

            self.component.values.testimonials.splice(index + 1, 0, self.component.values.testimonials.splice(index, 1)[0]);
            self.testimonialsDataSource.load(self.component.values.testimonials);
          });
          instance.up.subscribe((row) => {
            const index = self.component.values.testimonials.indexOf(row);
            if (index === 0) return;

            self.component.values.testimonials.splice(index - 1, 0, self.component.values.testimonials.splice(index, 1)[0]);
            self.testimonialsDataSource.load(self.component.values.testimonials);
          });
        },
      }
    });
  }

  ngOnInit(): void {
    this.component.values.testimonials = this.component.values.testimonials || [];
    createLocalDataSource(this.testimonialsDataSource, this.component.values, 'testimonials');
  }

  confirm = ($event: ConfirmObject<Testimonial>) => {
    if (!$event.data && $event.source.data.length >= 10) {
      this.toastrService.danger('Maximum 10 testimonials are allowed.', 'Error!');
      $event.confirm.reject();
    }

    const errors: string[] = [];
    if (!$event.newData.photo) {
      errors.push('Photo URL is required.');
    } else if (!$event.newData.photo.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)) {
      errors.push('Photo URL should be a valid URL.');
    }

    if (!$event.newData.name) {
      errors.push('Author\'s name is required.')
    }

    if (!$event.newData.title) {
      errors.push('Author\'s title is required.')
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
