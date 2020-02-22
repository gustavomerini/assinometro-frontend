import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarityFormComponent } from './clarity-form.component';

describe('ClarityFormComponent', () => {
  let component: ClarityFormComponent;
  let fixture: ComponentFixture<ClarityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClarityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
