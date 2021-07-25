import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementEnteringComponent } from './statement-entering.component';

describe('StatementEnteringComponent', () => {
  let component: StatementEnteringComponent;
  let fixture: ComponentFixture<StatementEnteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementEnteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementEnteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
