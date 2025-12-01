import { Component, inject, input } from '@angular/core';
import { Card } from '../../../../shared/components/card/card';
import { ContextFile } from '../../../../shared/types/context-file';
import { ContextMenu } from '../../../../shared/components/context-menu/context-menu';
import { MenuItem } from '../../../../shared/components/context-menu/types';
import { faFilePen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ContextFilesStore } from '../../../../store/context-files.store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { ContextFilesManagerService } from '../../context-files-manager/context-files-manager.service';
import { AddResourceResult } from '../../context-files-manager/types';
@Component({
  selector: 'app-file-list-item',
  imports: [Card, ContextMenu],
  templateUrl: './file-list-item.html',
  styleUrl: './file-list-item.scss',
})
export class FileListItem {
  private contextFilesStore = inject(ContextFilesStore);
  private dialog: MatDialog = inject(MatDialog);
  private readonly contextFilesManagerService = inject(ContextFilesManagerService);

  item = input<ContextFile | null>(null);

  protected menuItems: MenuItem[] = [
    {
      label: 'Update file',
      icon: faFilePen,
      action: () => this.updateFile(),
    },
    {
      label: 'Delete file',
      icon: faTrashCan,
      action: () => this.deleteFile(),
    },
  ];

  deleteFile(): void {
    const file = this.item();
    if (!file) {
      return;
    }

    this.dialog
      .open(ConfirmDialog, {
        width: '360px',
        panelClass: 'confirm-dialog-panel',
        data: {
          title: 'Delete item',
          message: 'Are you sure you want to delete this item?',
        },
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.performDelete(file.id);
        }
      });
  }

  /**
   * Deletes the context file with the given ID from the store.
   * This function is called when the user confirms deletion in the confirmation dialog.
   */
  private performDelete(id: string): void {
    this.contextFilesStore.deleteContextFile(id);
  }

  updateFile(): void {
    const file = this.item();
    if (!file) {
      return;
    }
    this.contextFilesManagerService.setSelectedItemId(file.id);
    this.contextFilesManagerService
      .open({ type: 'update', file })
      .then((result: AddResourceResult | null) => {
        if (!result) {
          return;
        }
        console.log('Update file result:', result);
      });
  }
}
