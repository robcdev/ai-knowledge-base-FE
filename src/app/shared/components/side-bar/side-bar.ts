import { Component, input } from '@angular/core';
import { SideBarHeader } from './side-bar-header/side-bar-header';
import { SideBarButton } from './side-bar-button/side-bar-button';
import { faChartLine, faCog, faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  imports: [SideBarHeader, SideBarButton],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  showClose = input(false);

  protected readonly faChartLine = faChartLine;
  protected readonly faCog = faCog;
  protected readonly faFile = faFile;
}
