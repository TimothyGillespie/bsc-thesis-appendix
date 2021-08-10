import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalConstraintsEnteringComponent } from './additional-constraints-entering.component';

describe('AdditionalConstraintsEnteringComponent', () => {
  let component: AdditionalConstraintsEnteringComponent;
  let fixture: ComponentFixture<AdditionalConstraintsEnteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalConstraintsEnteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalConstraintsEnteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
