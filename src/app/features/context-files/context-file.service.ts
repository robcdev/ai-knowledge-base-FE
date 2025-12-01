import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ContextFile } from '../../shared/types/context-file';

@Injectable({
  providedIn: 'root',
})
export class ContextFileService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches context files from the mock data.
   * @returns {Observable<ContextFile[]>} An observable of ContextFile array
   */
  getContextFiles(): Observable<ContextFile[]> {
    return this.http.get<ContextFile[]>('/mocks/context-files.json');
  }

  /**
   * Retrieves a single context file by its id.
   * @param {string} id - The id of the context file to retrieve.
   * @returns {Observable<ContextFile>} An observable of a ContextFile or an error if the file is not found.
   */
  getContextFile(id: string): Observable<ContextFile> {
    return this.getContextFiles().pipe(
      switchMap(files => {
        const file = files.find(f => f.id === id);
        if (file) {
          return new Observable<ContextFile>(observer => {
            observer.next(file);
            observer.complete();
          });
        } else {
          return throwError(() => new Error(`Context file with id ${id} not found`));
        }
      })
    );
  }

  uploadContextFile(file: File): Observable<ContextFile> {
    // This is a mock implementation. In a real scenario, you would send the file to the server.
    const mockResponse: ContextFile = {
      id: 'new-file-id',
      name: file.name,
      size: file.size,
      uploadDate: new Date(),
      url: '/path/to/uploaded/file',
      resourceMode: 'file',
    };
    return new Observable<ContextFile>(observer => {
      setTimeout(() => {
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });
  }

  /**
   * Deletes a context file by its id.
   * @param {string} id - The id of the context file to delete.
   * @returns {Observable<void>} An observable that completes on success or errors if the file is not found.
   */
  deleteContextFile(id: string): Observable<void> {
    return this.getContextFiles().pipe(
      switchMap(files => {
        const fileToDelete = files.find(file => file.id === id);

        if (!fileToDelete) {
          return throwError(() => new Error(`Context file with id ${id} not found`));
        }

        return new Observable<void>(observer => {
          setTimeout(() => {
            observer.next();
            observer.complete();
          }, 1000);
        });
      })
    );
  }

  /**
   * Updates a context file by its id.
   * @param {string} id - The id of the context file to update.
   * @param {Partial<ContextFile>} updates - The partial ContextFile object containing the updates.
   * @returns {Observable<ContextFile>} An observable of the updated ContextFile or an error if the file is not found.
   */
  updateContextFile(id: string, updates: Partial<ContextFile>): Observable<ContextFile> {
    return this.getContextFiles().pipe(
      switchMap(files => {
        const fileToUpdate = files.find(file => file.id === id);

        if (!fileToUpdate) {
          return throwError(() => new Error(`Context file with id ${id} not found`));
        }

        const updatedFile: ContextFile = {
          ...fileToUpdate,
          ...(updates.name !== undefined && { name: updates.name }),
          ...(updates.url !== undefined && { url: updates.url }),
          ...(updates.summary !== undefined && { summary: updates.summary }),
        };

        return new Observable<ContextFile>(observer => {
          setTimeout(() => {
            observer.next(updatedFile);
            observer.complete();
          }, 1000);
        });
      })
    );
  }
}
