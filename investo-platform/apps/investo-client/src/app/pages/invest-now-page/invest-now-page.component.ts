import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RealEstate } from '../../models/real-estate.model';
import { RealEstateService } from '../../services/real-estate.service';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-invest-now-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invest-now-page.component.html',
  styleUrl: './invest-now-page.component.scss'
})
export class InvestNowPageComponent implements OnInit {
  investmentForm: FormGroup;
  investmentAmount: number = 1000;
  isLoading = true;
  notFound = false;
  
  realEstate!: RealEstate;

  paymentMethods: PaymentMethod[] = [
    { id: 'credit-card', name: 'Credit/Debit Card', icon: 'credit_card' },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: 'account_balance' },
    { id: 'crypto', name: 'Cryptocurrency', icon: 'currency_bitcoin' }
  ];

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private realEstateService: RealEstateService
  ) {
    this.investmentForm = this.fb.group({
      investmentAmount: [this.investmentAmount, [
        Validators.required, 
        Validators.min(1000), // Default min, will be updated once data is loaded
        Validators.max(1000000) // Default max, will be updated once data is loaded
      ]],
      paymentMethod: ['credit-card', [Validators.required]],
      termsAccepted: [false, [Validators.requiredTrue]]
    });
  }
  
  ngOnInit(): void {
    // Scroll to top when component initializes
    window.scrollTo(0, 0);

    // Get the id from the route parameters
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadRealEstateData(id);
      } else {
        this.notFound = true;
        this.isLoading = false;
      }
    });
  }

  loadRealEstateData(id: number): void {
    this.realEstateService.getRealEstateById(id).subscribe(
      realEstate => {
        if (realEstate) {
          this.realEstate = realEstate;
          this.investmentAmount = realEstate.minInvestment || 1000;
          
          // Update form validators with the actual min and max values
          this.investmentForm.get('investmentAmount')?.setValue(this.investmentAmount);
          this.investmentForm.get('investmentAmount')?.setValidators([
            Validators.required, 
            Validators.min(realEstate.minInvestment || 1000),
            Validators.max(realEstate.maxInvestment || 1000000)
          ]);
          
          this.isLoading = false;
        } else {
          this.notFound = true;
          this.isLoading = false;
        }
      },
      error => {
        console.error('Error loading real estate details:', error);
        this.notFound = true;
        this.isLoading = false;
      }
    );
  }

  get estimatedYearlyReturn(): number {
    if (!this.realEstate) return 0;
    return this.investmentAmount * (this.realEstate.expectedRoi! / 100);
  }

  increaseInvestment(amount: number): void {
    if (!this.realEstate) return;
    
    const newAmount = this.investmentAmount + amount;
    if (newAmount <= this.realEstate.maxInvestment!) {
      this.investmentAmount = newAmount;
      this.investmentForm.get('investmentAmount')?.setValue(this.investmentAmount);
    }
  }

  decreaseInvestment(amount: number): void {
    if (!this.realEstate) return;
    
    const newAmount = this.investmentAmount - amount;
    if (newAmount >= this.realEstate.minInvestment!) {
      this.investmentAmount = newAmount;
      this.investmentForm.get('investmentAmount')?.setValue(this.investmentAmount);
    }
  }

  onInvestmentInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.investmentAmount = Number(input.value);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  onSubmit(): void {
    if (this.investmentForm.valid) {
      console.log('Investment submitted:', {
        propertyId: this.realEstate.id,
        propertyTitle: this.realEstate.title,
        ...this.investmentForm.value
      });
      alert('Investment submitted successfully!');
    } else {
      this.markFormGroupTouched(this.investmentForm);
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
