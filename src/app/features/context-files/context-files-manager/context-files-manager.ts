import { Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResourceMode } from '../../../shared/types/context-file';
import { Button } from '../../../shared/components/button/button';
import { AddResourceResult } from './types';
import {
  ContextFilesManagerRequest,
  ContextFilesManagerService,
} from './context-files-manager.service';

@Component({
  selector: 'app-context-files-manager',
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './context-files-manager.html',
  styleUrl: './context-files-manager.scss',
})
export class ContextFilesManager {
  private readonly managerService = inject(ContextFilesManagerService);
  readonly mode = computed(() => this.managerService.mode());
  readonly request = computed(() => this.managerService.request());

  fileInput = viewChild<ElementRef>('fileInput');
  selectedFile = signal<File | undefined>(undefined);
  url = signal('');

  constructor() {
    effect(() => {
      const mode = this.mode();
      if (mode === 'file') {
        this.url.set('');
      } else {
        this.selectedFile.set(undefined);
        this.resetFileInput();
      }
    });
  }

  /**
   * Called when the file input changes.
   * Sets the selectedFile writable signal to the selected file, or undefined if no file is selected.
   */
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.selectedFile.set(file ?? undefined);
    this.url.set('');
  }

  /**
   * Called when the URL input changes.
   * Clears the selected file to ensure only one source is active.
   */
  onUrlChange(value: string) {
    this.url.set(value);
    if (value) {
      this.selectedFile.set(undefined);
      this.resetFileInput();
    }
  }

  /**
   * Resets the file input field by setting its value to an empty string.
   * This is done to clear the file input field when the URL input is changed.
   */
  private resetFileInput() {
    if (this.fileInput()?.nativeElement) {
      this.fileInput()!.nativeElement.value = '';
    }
  }

  setMode(mode: ResourceMode) {
    this.managerService.setMode(mode);
  }

  /**
   * Returns true if the input is valid for saving, false otherwise.
   * For file mode, returns true if a file is selected.
   * For url mode, returns true if the url is not empty after trimming.
   * @return {boolean} True if the input is valid for saving, false otherwise.
   */
  canSave(): boolean {
    if (this.mode() === 'file') {
      return !!this.selectedFile();
    }
    if (this.mode() === 'url') {
      return !!this.url()?.trim();
    }
    return false;
  }

  /**
   * Called when the save button is clicked.
   * Emits the save output event with the type and data of the input.
   * If the input is invalid, does nothing.
   * @see canSave
   */
  onSave() {
    if (!this.canSave()) {
      return;
    }

    if (this.mode() === 'file' && this.selectedFile()) {
      this.managerService.save({
        type: 'file',
        file: this.selectedFile(),
      });
    } else if (this.mode() === 'url') {
      this.managerService.save({
        type: 'url',
        url: this.url().trim(),
      });
    }
  }

  /**
   * Emits the cancel output event when the cancel button is clicked.
   */
  onCancel() {
    this.managerService.cancel();
  }
}
