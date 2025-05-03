import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RealEstate } from '../../models/real-estate.model';
import { RealEstateService } from '../../services/real-estate.service';

@Component({
  selector: 'app-real-estate-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './real-estate-details.component.html',
  styleUrl: './real-estate-details.component.scss'
})
export class RealEstateDetailsComponent implements OnInit {
  realEstate!: RealEstate;
  activeImageIndex = 0;
  numberOfTokens = 10;
  isLoading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private realEstateService: RealEstateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadRealEstateData(id);
      } else {
        this.notFound = true;
        this.isLoading = false;
      }
    });
    
    window.scrollTo(0, 0);
  }

  loadRealEstateData(id: number): void {
    this.realEstateService.getRealEstateById(id).subscribe(
      realEstate => {
        if (realEstate) {
          this.realEstate = realEstate;
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

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  formatPercentage(value: number): string {
    return `${value}%`;
  }

  getProgressPercentage(): number {
    return (this.realEstate.currentFunding / this.realEstate.fundingGoal) * 100;
  }

  decreaseTokens(): void {
    if (this.numberOfTokens > 1) {
      this.numberOfTokens--;
    }
  }

  increaseTokens(): void {
    if (this.numberOfTokens < this.realEstate.tokensAvailable) {
      this.numberOfTokens++;
    }
  }

  getTotalInvestment(): number {
    return this.numberOfTokens * this.realEstate.tokenPrice;
  }

  navigateToInvest(): void {
    this.router.navigate(['/realestate/invest/', this.realEstate.id]);
  }
}
