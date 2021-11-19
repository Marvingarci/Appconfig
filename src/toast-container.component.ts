import {Component, TemplateRef} from '@angular/core';
import { ToastService } from './toast.services';



@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname "
      [autohide]="true"
      [delay]="toast.delay || 2000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <button (click)=saludame() type="btn" class="btn btn-primary">saludar</button>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  saludame(){
      alert('hola');
  }

  isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }
}