import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListItem } from './file-list-item';

describe('ListItem', () => {
  let component: FileListItem;
  let fixture: ComponentFixture<FileListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(FileListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
