import { Injectable, signal } from '@angular/core';
import { AddResourceResult } from './types';
import { ContextFile, ResourceMode } from '../../../shared/types/context-file';

export type ContextFilesManagerRequest = { type: 'create' } | { type: 'update'; file: ContextFile };

@Injectable({
  providedIn: 'root',
})
export class ContextFilesManagerService {
  readonly isOpen = signal(false);
  readonly request = signal<ContextFilesManagerRequest | null>(null);
  mode = signal<ResourceMode>('file');
  selectedItemId = signal<string | null>(null);

  private resolver?: (result: AddResourceResult | null) => void;

  /**
   * Opens the context files manager modal with the given request.
   * @param request - The request to open the modal with. Can be either a create or update request.
   * @returns A promise that resolves with the result of the modal action (AddResourceResult or null).
   */
  open(request: ContextFilesManagerRequest): Promise<AddResourceResult | null> {
    this.request.set(request);
    this.isOpen.set(true);
    return new Promise(resolve => {
      this.resolver = resolve;
    });
  }

  /**
   * Cancels the context files manager modal, resolving the promise with null.
   */
  cancel() {
    this.resolveWith(null);
  }

  /**
   * Sets the selected item ID of the context files manager modal.
   * @param id - The ID of the selected item, or null if no item is selected.
   */
  setSelectedItemId(id: string | null) {
    this.selectedItemId.set(id);
  }

  /**
   * Resolves the promise with the given result when the context files manager modal is saved.
   * @param result - The result of the modal action (AddResourceResult).
   */
  save(result: AddResourceResult) {
    this.resolveWith(result);
  }

  /**
   * Resolves the promise that is returned by the open method with the given result.
   * If the result is null, it means the modal was cancelled.
   * @param result - The result of the modal action (AddResourceResult or null).
   */
  private resolveWith(result: AddResourceResult | null) {
    this.resolver?.(result);
    this.resolver = undefined;
    this.isOpen.set(false);
    this.request.set(null);
    this.mode.set('file');
  }

  /**
   * Sets the resource mode for the context files manager modal.
   * @param mode - The resource mode to set (either 'file' or 'url').
   */
  setMode(mode: ResourceMode) {
    this.mode.set(mode);
  }
}
