import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent {
  @Input() message: string = 'Default Success Message';
  @Input() backgroundColor: string = '#6bb56e';
}
