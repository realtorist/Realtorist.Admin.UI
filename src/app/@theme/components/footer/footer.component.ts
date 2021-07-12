import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by Dmytro Bondarchuk, using <a href="https://akveo.page.link/8V2f" target="_blank">Akveo</a>
    </span>
    <div class="socials">
      <a href="https://www.linkedin.com/in/dmytro-bondarchuk/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
