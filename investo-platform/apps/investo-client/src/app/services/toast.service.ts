import { Injectable } from '@angular/core';
import { Toast } from '../components/toast-notification/toast-notification.component';


@Injectable({ providedIn: 'root' })
export class ToastService {
  
  toasts: Toast[] = [];
  
  
  private readonly ANIMATION_DURATION = 400;


  get activeToasts(): Toast[] {
    return [...this.toasts];
  }

  show(toast: Toast): void {
    
    if (!toast.duration) {
      toast.duration = 3000; 
    }
    
    this.toasts.push(toast);
    
    
    setTimeout(() => {
      if (this.toasts.includes(toast)) {
        this.scheduleRemoval(toast);
      }
    }, toast.duration);
  }

  remove(toast: Toast): void {
    if (this.toasts.includes(toast)) {
      this.scheduleRemoval(toast);
    }
  }

  private scheduleRemoval(toast: Toast): void {
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t !== toast);
    }, this.ANIMATION_DURATION);
  }
}