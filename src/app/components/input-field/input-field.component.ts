import { Component, forwardRef, Input  } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [FormsModule],
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

  value: string = ' ';
  disabled: boolean = false;
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
/*
  onInput(event: InputEvent): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.value = target.value;
      this.onChange(this.value);
      this.onTouched();
    }
  }
    */
  onInput(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
