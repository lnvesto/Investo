import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent implements OnInit {
  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  step: 'email' | 'code' | 'password' = 'email';
  resetToken: string | null = null;
  showNewPassword = false;
  showConfirmPassword = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    
    this.codeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      resetCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^\d+$/)]]
    });
    
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.emailForm.patchValue({ email: params['email'] });
        this.codeForm.patchValue({ email: params['email'] });
      }
      
      if (params['step'] === 'code') {
        this.step = 'code';
      }
    });
  }
  
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
  
  requestCode(): void {
    if (this.emailForm.invalid) {
      this.markFormGroupTouched(this.emailForm);
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;
    
    const email = this.emailForm.value.email;
    
    this.authService.requestPasswordResetCode(email).subscribe({
      next: () => {
        this.successMessage = 'A password reset code has been sent to your email';
        this.step = 'code';
        this.codeForm.patchValue({ email: email });
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Reset code request error:', err);
        this.errorMessage = err.error?.message || 'Failed to send reset code. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
  
  verifyCode(): void {
    if (this.codeForm.invalid) {
      this.markFormGroupTouched(this.codeForm);
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;
    
    const { email, resetCode } = this.codeForm.value;
    
    
    this.authService.verifyResetCode(email, resetCode).subscribe({
      next: (response) => {
        if (response && response.temporaryToken) {
          this.resetToken = response.temporaryToken;
          this.successMessage = 'Code verified successfully. Please set your new password.';
          this.step = 'password';
        } else {
          this.errorMessage = 'Failed to verify code. Please try again.';
        }
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Code verification error:', err);
        this.errorMessage = err.error?.message || 'Invalid or expired code. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
  
  resetPassword(): void {
    if (this.passwordForm.invalid) {
      this.markFormGroupTouched(this.passwordForm);
      return;
    }
    
    if (!this.resetToken) {
      this.errorMessage = 'Password reset session expired. Please start over.';
      this.step = 'email';
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;
    
    const newPassword = this.passwordForm.value.newPassword;
    
    this.authService.confirmPasswordReset(newPassword, this.resetToken).subscribe({
      next: () => {
        this.successMessage = 'Your password has been reset successfully. Redirecting to login...';
        
        setTimeout(() => {
          this.router.navigate(['/login'], { 
            queryParams: { 
              email: this.codeForm.value.email 
            }
          });
        }, 2000);
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Password reset error:', err);
        this.errorMessage = err.error?.message || 'Failed to reset password. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
  
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  togglePasswordVisibility(field: 'newPassword' | 'confirmPassword'): void {
    if (field === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
