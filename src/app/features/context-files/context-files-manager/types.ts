import { ResourceMode } from '../../../shared/types/context-file';

export interface AddResourceResult {
  type: ResourceMode;
  file?: File;
  url?: string;
}
