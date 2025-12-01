import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-side-bar-button',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar-button.html',
  styleUrl: './side-bar-button.scss',
})
export class SideBarButton {
  label = input.required<string>();
  icon = input.required<IconDefinition>();
  route = input.required<string>();
  exact = input<boolean>(false);
}
