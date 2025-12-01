import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface MenuItem {
  label: string;
  icon: IconDefinition;
  action: () => void;
}

export type MenuAlignment = 'start' | 'end';
