import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionDefinitionsComponent } from './function-definitions.component';

describe('FunctionDefinitionsComponent', () => {
  let component: FunctionDefinitionsComponent;
  let fixture: ComponentFixture<FunctionDefinitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionDefinitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
