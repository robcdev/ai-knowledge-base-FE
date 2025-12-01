import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly clicked = output<void>();
  disabled = input(false);

  onClick() {
    if (this.disabled()) {
      return;
    }
    this.clicked.emit();
  }
}
