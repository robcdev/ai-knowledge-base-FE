import { Component, OnDestroy, input, viewChild } from '@angular/core';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { MenuAlignment, MenuItem } from './types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-context-menu',
  imports: [CdkMenu, CdkMenuItem, CdkMenuTrigger, FaIconComponent, NgClass],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
})
export class ContextMenu implements OnDestroy {
  menuItems = input.required<MenuItem[]>();
  alignment = input<MenuAlignment>('end');
  protected readonly faEllipsisVertical = faEllipsisVertical;
  menuTrigger = viewChild(CdkMenuTrigger);

  constructor() {
    document.addEventListener('scroll', this.handleScroll, true);
  }

/**
 * Removes the event listener for the scroll event and closes the menu when the component is destroyed.
 */
  ngOnDestroy(): void {
    document.removeEventListener('scroll', this.handleScroll, true);
    this.menuTrigger()?.close();
  }

  private handleScroll = () => {
    this.menuTrigger()?.close();
  };
}
