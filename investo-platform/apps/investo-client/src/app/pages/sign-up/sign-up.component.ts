import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { userTypeId } from '../../models/user-type.enum';
import { AuthResponse } from '../../models/auth.types';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  validationErrors: string[] = [];
  userTypeId = userTypeId;
  showPassword = false;
  showConfirmPassword = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.signUpForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(3)]],
      LastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      userTypeId: ['2', Validators.required], 
      agreeTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordsMatchValidator
    });
  }
  
  ngOnInit(): void {
    
  }
  
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
  
  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.markFormGroupTouched(this.signUpForm);
      this.toastService.show({
        message: 'Please fill in all required fields correctly',
        type: 'error',
        duration: 3000
      });
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    
    const formData = {
      ...this.signUpForm.value,
      userTypeId: parseInt(this.signUpForm.value.userTypeId, 10)
    };
    
    this.authService.register(formData).subscribe({
      next: (response) => {
        if (response.token) {
          this.toastService.show({
            message: 'Registration successful! Logging you in...',
            type: 'success',
            duration: 3000
          });
          
          const loginCredentials = {
            email: formData.email,
            password: formData.password
          };
          
          this.authService.login(loginCredentials).subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('Auto-login after registration failed:', error);
              this.toastService.show({
                message: 'Registration successful! Please log in manually.',
                type: 'info',
                duration: 3000
              });
              this.router.navigate(['/login'], { 
                queryParams: { 
                  registered: 'true',
                  email: formData.email 
                }
              });
            }
          });
        } else {
          this.toastService.show({
            message: 'Registration successful! Please log in to continue.',
            type: 'info',
            duration: 3000
          });
          this.router.navigate(['/login'], { 
            queryParams: { 
              registered: 'true',
              email: formData.email 
            }
          });
        }
      },
      error: (error) => {
        console.error('Registration error:', error);
        const errorMsg = error.error?.message || 'An error occurred during registration';
        this.errorMessage = errorMsg;
        this.toastService.show({
          message: errorMsg,
          type: 'error',
          duration: 3000
        });
        this.isSubmitting = false;
      }
    });
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
