import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserType } from '../../models/user-type.enum';
import { AuthResponse } from '../../models/auth-response.interface';

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
  UserType = UserType;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      userType: ['0', Validators.required], // Default to Investor (0)
      agreeTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordsMatchValidator
    });
  }
  
  ngOnInit(): void {
    // Additional initialization logic if needed
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
    if (this.signUpForm.valid) {
      const formData = {
        ...this.signUpForm.value,
        userType: parseInt(this.signUpForm.value.userType, 10) // Convert string to number
      };
      
      this.authService.register(formData).subscribe({
        next: (response) => {
          if (response.success) {
            // If no token is returned, redirect to login
            if (!response.token) {
              this.router.navigate(['/login'], { 
                queryParams: { 
                  registered: 'true',
                  email: response.email 
                }
              });
            } else {
              // Store user data in localStorage only if token is present
              localStorage.setItem('currentUser', JSON.stringify({
                email: response.email,
                fullName: response.fullName,
                userType: response.userType,
                token: response.token
              }));
              this.router.navigate(['/dashboard']);
            }
          } else {
            this.errorMessage = response.message || 'Registration failed';
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'An error occurred during registration';
        }
      });
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
