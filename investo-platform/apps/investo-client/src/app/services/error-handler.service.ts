import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ErrorState {
  message: string;
  code?: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorSubject = new BehaviorSubject<ErrorState | null>(null);
  error$ = this.errorSubject.asObservable();

  handleError(error: any): void {
    console.error('Application Error:', error);
    
    const errorState: ErrorState = {
      message: error.error?.message || 'An unexpected error occurred',
      code: error.status?.toString(),
      timestamp: new Date()
    };

    this.errorSubject.next(errorState);
    

    setTimeout(() => {
      this.clearError();
    }, 5000);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
} 