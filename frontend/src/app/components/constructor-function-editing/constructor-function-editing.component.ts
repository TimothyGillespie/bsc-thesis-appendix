import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-constructor-function-editing',
  templateUrl: './constructor-function-editing.component.html',
  styleUrls: ['./constructor-function-editing.component.scss']
})
export class ConstructorFunctionEditingComponent implements OnInit {

  @Input('abstractFormGroup') formGroup!: AbstractControl;
  term!: FormControl;
  type!: FormControl;
  functions!: FormArray;

  constructor() { }

  ngOnInit() {
    if(this.formGroup instanceof FormGroup) {
      this.term = this.formGroup.get('term') as FormControl;
      this.type = this.formGroup.get('type') as FormControl;
      this.functions = this.formGroup.get('functions') as FormArray;
    }
  }

}
