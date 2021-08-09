import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DefaultEditor } from 'ng2-smart-table';
import { SiteLink } from '../../../@core/models/links/siteLinks';
import { AppState } from '../../../@store/appStore';
import { selectSiteLinks } from '../../../@store/selectors/website.selector';

const maxNumberOfOptions = 100;

@Component({
  template: `<input nbInput
                         [(ngModel)]="cell.newValue"
                         type="text"
                         name="link-autocomplete"
                         placeholder="Link"
                         fullWidth
                         [nbAutocomplete]="linkComplete"
                         [focusInputOnValueChange]="false">
                  <nb-autocomplete #linkComplete>

                    <nb-option *ngFor="let siteLink of getFilteredOptions()"
                               [value]="siteLink.link">
                      <div class="w-100 mb-3">{{ siteLink.link }}<br/><small>{{siteLink.title}}</small></div>
                    </nb-option>

                  </nb-autocomplete>`,
})
export class LinkAutoSuggestEditComponent extends DefaultEditor implements OnInit {
  
  links: SiteLink[] = [];

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.store.select(selectSiteLinks).subscribe(links => this.links = links);

    this.cell.newValue = this.cell.getValue() || null;
  }

  getFilteredOptions() {
    if (!this.cell.newValue) return this.links.slice(0, maxNumberOfOptions);

    return (this.links || []).filter(
      (option) =>
        option.link.toLocaleLowerCase().indexOf(this.cell.newValue.toLocaleLowerCase()) >= 0
        || option.title.toLocaleLowerCase().indexOf(this.cell.newValue.toLocaleLowerCase()) >= 0
    ).slice(0, maxNumberOfOptions);
  }
}
