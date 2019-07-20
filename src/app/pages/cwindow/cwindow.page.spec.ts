import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwindowPage } from './cwindow.page';

describe('CwindowPage', () => {
  let component: CwindowPage;
  let fixture: ComponentFixture<CwindowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwindowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwindowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
