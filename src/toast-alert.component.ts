import {Component, TemplateRef} from '@angular/core';
import { ToastServiceAlert } from './toastAlert.services';

@Component({
  selector: 'app-toasts-alert',
  template: `
    <ngb-toast  
      style="background-color:#f57317;color:#fff"
      *ngFor="let toast of toastServiceAlert.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"    
    >

    <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text" >
        <ng-template [ngTemplateOutlet]="toast.textOrTpl" > </ng-template>
      </ng-template> 

      <ng-template #text >{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsAlert {
  constructor( public toastServiceAlert: ToastServiceAlert) {}  

  isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }
}