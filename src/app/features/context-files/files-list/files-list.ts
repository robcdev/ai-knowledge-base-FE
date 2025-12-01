import { Component, input } from '@angular/core';
import { FileListItem } from './file-list-item/file-list-item';
import { ContextFile } from '../../../shared/types/context-file';

@Component({
  selector: 'app-files-list',
  imports: [FileListItem],
  templateUrl: './files-list.html',
  styleUrl: './files-list.scss',
})
export class FilesList {
  items = input<ContextFile[]>([]);
}
