import { Injectable, signal, computed, inject } from '@angular/core';
import { ContextFile } from '../shared/types/context-file';
import { ContextFileService } from '../features/context-files/context-file.service';

interface ContextFilesState {
  contextFiles: ContextFile[];
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ContextFilesStore {
  private readonly contextFileService = inject(ContextFileService);

  // Private writable signal for the state
  private readonly state = signal<ContextFilesState>({
    contextFiles: [],
    isLoading: false,
    isLoaded: false,
    error: null,
  });

  // Public readonly signals
  readonly contextFiles = computed(() => this.state().contextFiles);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly isLoaded = computed(() => this.state().isLoaded);
  readonly error = computed(() => this.state().error);
  readonly contextFilesCount = computed(() => this.state().contextFiles.length);

  /**
   * Loads context files from the service.
   * Only fetches data if not already loaded or loading.
   */
  loadContextFiles(): void {
    // Skip if already loaded or currently loading
    if (this.state().isLoaded || this.state().isLoading) {
      return;
    }

    this.state.update(state => ({ ...state, isLoading: true, error: null }));

    this.contextFileService.getContextFiles().subscribe({
      next: contextFiles => {
        this.state.update(state => ({
          ...state,
          contextFiles,
          isLoading: false,
          isLoaded: true,
        }));
      },
      error: error => {
        this.state.update(state => ({
          ...state,
          error: error.message,
          isLoading: false,
        }));
      },
    });
  }

  /**
   * Updates a context file by its id.
   * Only name, url, and summary are updatable.
   */
  updateContextFile(id: string, updates: Partial<ContextFile>): void {
    this.setIsLoading(true);

    this.contextFileService.updateContextFile(id, updates).subscribe({
      next: updatedFile => {
        this.state.update(state => ({
          ...state,
          contextFiles: state.contextFiles.map(file => (file.id === id ? updatedFile : file)),
        }));
      },
      error: error => {
        console.error('Failed to update context file:', error);
      },
      complete: () => {
        this.state.update(state => ({
          ...state,
          isLoading: false,
        }));
      },
    });
  }

  /**
   * Deletes a context file by its id.
   */
  deleteContextFile(id: string): void {
    this.setIsLoading(true);

    this.contextFileService.deleteContextFile(id).subscribe({
      next: () => {
        this.removeContextFileFromState(id);
      },
      error: error => {
        console.error('Failed to delete context file:', error);
      },
      complete: () => {
        this.setIsLoading(false);
      },
    });
  }

  /**
   * Resets the store to initial state.
   */
  reset(): void {
    this.state.set({
      contextFiles: [],
      isLoading: false,
      isLoaded: false,
      error: null,
    });
  }

  /**
   * Updates the isLoading state.
   * @param isLoading The new isLoading state.
   */
  private setIsLoading(isLoading: boolean): void {
    this.state.update(state => ({
      ...state,
      isLoading,
    }));
  }

  /**
   * Gets a single context file by its id from the store.
   * Returns undefined if not found.
   */
  private getContextFile(id: string): ContextFile | undefined {
    return this.state().contextFiles.find(file => file.id === id);
  }

  /**
   * Removes a context file from the state by its id.
   * If the context file is not found in the state, a warning will be logged.
   * @param id The id of the context file to remove.
   */
  private removeContextFileFromState(id: string): void {
    // Remove the context file from the state using the id
    if (!this.getContextFile(id)) {
      console.warn(`Context file with id ${id} not found in state`);
      return;
    }
    this.state.update(state => ({
      ...state,
      contextFiles: state.contextFiles.filter(file => file.id !== id),
    }));
  }
}
