import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { ContextMenu } from '../../context-menu/context-menu';
import { MenuItem } from '../../context-menu/types';
import { ContextFilesManagerService } from '../../../../features/context-files/context-files-manager/context-files-manager.service';

@Component({
  selector: 'app-side-bar-header',
  imports: [CommonModule, ContextMenu],
  templateUrl: './side-bar-header.html',
  styleUrl: './side-bar-header.scss',
})
export class SideBarHeader {
  private readonly contextFilesManagerService = inject(ContextFilesManagerService);
  protected menuItems: MenuItem[] = [
    {
      label: 'Upload a context file',
      icon: faFileUpload,
      action: () => this.fileUpload(),
    },
  ];

  /**
   * Triggers a file upload dialog. When a file is selected, it will be uploaded to the server and the data will be extracted.
   * This is currently mocked out in the mocks folder.
   */
  fileUpload(): void {
    this.contextFilesManagerService.open({ type: 'create' }).then(result => {
      if (result) {
        console.log('File added from sidebar header:', result);
      }
    });
  }
}
