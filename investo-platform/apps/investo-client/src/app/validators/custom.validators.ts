import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordStrength(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    return valid ? null : { passwordStrength: true };
  }

  static passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  static emailFormat(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(value);
    return valid ? null : { emailFormat: true };
  }

  static nameFormat(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
    const valid = nameRegex.test(value);
    return valid ? null : { nameFormat: true };
  }

  static phoneFormat(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const valid = phoneRegex.test(value);
    return valid ? null : { phoneFormat: true };
  }

  static dateOfBirth(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const date = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age--;
    }

    return age >= 18 ? null : { underAge: true };
  }
} 