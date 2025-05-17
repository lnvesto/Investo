import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface Toast {
  title?: string;
  message: string;
  subText?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}



@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss']
})
export class ToastNotificationComponent implements OnInit, OnDestroy {
  
  @Input() toast!: Toast;
  
  
  @Output() close = new EventEmitter<void>();

  
  isClosing = false;

  
  private timeoutId?: number;

  ngOnInit(): void {
    if (this.toast.duration && this.toast.duration > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.startClosing();
      }, this.toast.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
  }

  
   
  getToastClasses(): { [key: string]: boolean } {
    return {
      'fade-out': this.isClosing,
      [this.toast.type || 'info']: true
    };
  }

  

  onClose(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.startClosing();
  }


  onAction(): void {
    if (this.toast.onAction) {
      this.toast.onAction();
    }
  }


  private startClosing(): void {
    this.isClosing = true;
    setTimeout(() => {
      this.close.emit();
    }, 400); 
  }
}