import { Component, Input, OnInit } from "@angular/core";
import {
  NbToastrService,
} from "@nebular/theme";
import { LocalDataSource } from 'ng2-smart-table';
import { Testimonial } from '../../../@core/models/settings/testimonial';
import { ConfirmObject } from '../../../@core/models/smartTable/confirmObject';
import { createLocalDataSource, defaultInlineTableSettings, enumColumn, photoColumn, stringColumn } from '../../../@core/models/smartTable/inlineTableSettings';
import { OrderAdditionalActionComponent } from '../../../@common/components/table/orderAdditionalAction.component';
import { EmptyCellEditComponent } from '../../../@common/components/table/emptyCellEditorComponent.component';
import { PageComponent } from '../../../@core/models/settings/appearance/pageComponent';
import { EnumDisplayMap } from '../../../@core/models/enumDisplayMap';

interface Service {
  title: string;
  text: string;
  link: string;
  icon: string;
}

EnumDisplayMap['ServiceHomePageComponentIcon'] = {
  hotel: 'Hotel',
  briefcase: 'Briefcase',
  'bike-path': 'Bike path',
  factory: 'Factory',
  building: 'Building',
  agricultural: 'Agricultural',
  market: 'Market',
  'building-1': 'Building 2',
  'parking-area': 'Parking area',
  town: 'Town',
  land: 'Land',
  house: 'House',
  button: 'Button'
}

@Component({
  selector: "ngx-services-page-component",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesPageComponentComponent implements OnInit {
  @Input() component: PageComponent

  servicesDataSource = new LocalDataSource();
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
      link: stringColumn('Link', undefined, true),
      icon: enumColumn('Icon', 'ServiceHomePageComponentIcon', [], true),
      action: {
        type: 'custom',
        filter: false,
        editor: {
          type: 'custom',
          component: EmptyCellEditComponent
        },
        renderComponent: OrderAdditionalActionComponent,
        onComponentInitFunction(instance: OrderAdditionalActionComponent<Testimonial>) {
          instance.setArray('services', self.component.values);
          instance.down.subscribe((row) => {
            const index = self.component.values.services.indexOf(row);
            if (index === self.component.values.services.length - 1) return;

            self.component.values.services.splice(index + 1, 0, self.component.values.services.splice(index, 1)[0]);
            self.servicesDataSource.load(self.component.values.services);
          });
          instance.up.subscribe((row) => {
            const index = self.component.values.services.indexOf(row);
            if (index === 0) return;

            self.component.values.services.splice(index - 1, 0, self.component.values.services.splice(index, 1)[0]);
            self.servicesDataSource.load(self.component.values.services);
          });
        },
      }
    });
  }

  ngOnInit(): void {
    this.component.values.services = this.component.values.services || [];
    createLocalDataSource(this.servicesDataSource, this.component.values, 'services');
  }

  confirm = ($event: ConfirmObject<Service>) => {
    if (!$event.data && $event.source.data.length >= 4) {
      this.toastrService.danger('Maximum 4 services are allowed.', 'Error!');
      $event.confirm.reject();
    }

    const errors: string[] = [];
    if (!$event.newData.title) {
      errors.push('Title is required.')
    }

    if (!$event.newData.text) {
      errors.push('Text is required.')
    }

    if (!$event.newData.icon) {
      errors.push('Icon is required.')
    }

    if (errors.length > 0) {
      this.toastrService.danger(errors.join('\n'), 'Error!');
      $event.confirm.reject();
    } else {
      $event.confirm.resolve($event.newData);
    }
  }
}
