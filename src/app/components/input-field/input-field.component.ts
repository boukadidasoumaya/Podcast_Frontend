import { Component, forwardRef, Input  } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent),
    multi: true
  }]
})
export class InputFieldComponent {
  @Input() icon: string = ''; 
  @Input() type: string = 'text'; 
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() required: boolean = false;

  value: any = ' ';
  disabled: boolean = false;
  touched: boolean = false;


  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onInput(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

 
}
