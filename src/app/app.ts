import { Component, inject, signal } from '@angular/core';
import { SideBar } from './shared/components/side-bar/side-bar';
import { MainContainer } from './shared/components/main-container/main-container';
import { ContextFilesStore } from './store/context-files.store';
import { ContextFilesManager } from './features/context-files/context-files-manager/context-files-manager';
import { ContextFilesManagerService } from './features/context-files/context-files-manager/context-files-manager.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [SideBar, MainContainer, ContextFilesManager, FaIconComponent, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('web');
  private readonly contextFilesStore = inject(ContextFilesStore);
  protected readonly contextFilesManagerService = inject(ContextFilesManagerService);
  protected readonly faBars = faBars;
  protected readonly faXmark = faXmark;
  protected showMobileMenu = signal(false);

  constructor() {
    // Load context files on app initialization
    this.contextFilesStore.loadContextFiles();
    console.log('App initialized - Context files loading...');
  }

  toggleMenu() {
    this.showMobileMenu.update(v => !v);
  }

  closeMenu() {
    this.showMobileMenu.set(false);
  }
}
