import { Component, OnDestroy, computed, effect, inject, signal } from '@angular/core';
import { FilesList } from './files-list/files-list';
import { ContextFilesStore } from '../../store';
import { Button } from '../../shared/components/button/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { AddResourceResult } from './context-files-manager/types';
import { ContextFilesManagerService } from './context-files-manager/context-files-manager.service';

@Component({
  selector: 'app-context-files',
  imports: [FilesList, Button, MatDividerModule, CommonModule],
  templateUrl: './context-files.html',
  styleUrl: './context-files.scss',
})
export class ContextFiles implements OnDestroy {
  private contextFilesStore = inject(ContextFilesStore);
  private readonly managerService = inject(ContextFilesManagerService);
  contextFiles = this.contextFilesStore.contextFiles;
  searchTerm = signal('');
  private debouncedSearchTerm = signal('');
  private debounceHandle?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      const term = this.searchTerm().trim().toLowerCase();
      if (this.debounceHandle) {
        clearTimeout(this.debounceHandle);
      }
      this.debounceHandle = setTimeout(() => this.debouncedSearchTerm.set(term), 100);
    });
  }

  filteredItems = computed(() => {
    const term = this.debouncedSearchTerm();
    const items = this.contextFiles();
    if (!term) {
      return items;
    }
    return items.filter(
      item =>
        item.name.toLowerCase().includes(term) || (item.name?.toLowerCase() ?? '').includes(term)
    );
  });

  /**
   * Sets the search term in the context files page.
   * @param term - The search term to set
   */
  onSearch(term: string) {
    this.searchTerm.set(term);
  }

  onModalSave(result: AddResourceResult) {
    alert('File added successfully: This is a placeholder action.');
    // The file will be added, if it is a web site it will scraped and stored from the backend. Then the proper object will be returned in the updated list.
    console.log('File added:', result);
  }

  openModal() {
    this.managerService.open({ type: 'create' }).then(result => {
      if (result) {
        this.onModalSave(result);
      }
    });
  }

  onModalCancel() {
    this.managerService.cancel();
  }

  /**
   * Clears the search term in the context files page.
   */
  clearSearch() {
    this.searchTerm.set('');
  }

  addFile() {}

  ngOnDestroy() {
    if (this.debounceHandle) {
      clearTimeout(this.debounceHandle);
    }
  }
}
