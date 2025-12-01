import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextFilesManager } from './context-files-manager';

describe('ContextFilesManager', () => {
  let component: ContextFilesManager;
  let fixture: ComponentFixture<ContextFilesManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextFilesManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextFilesManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
