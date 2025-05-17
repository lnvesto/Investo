import { CommonModule } from '@angular/common';
import { Component, Input, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../../models/real-estate.model';

@Component({
  selector: 'app-real-estate-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './real-estate-card.component.html',
  styleUrl: './real-estate-card.component.scss'
})
export class RealEstateCardComponent implements OnInit, OnDestroy {
  @Input() realEstate: RealEstate = {
    id: 1,
    publisher_id: 101,
    title: 'Modern Apartments',
    description: 'A beautiful 2-bedroom apartment located in the heart of the city.',
    publishDate: new Date('2024-06-01'),
    price: 250000,
    location: 'Kyiv, Ukraine',
    category: 'Construction',
    area: 0,
    roi: 0,
    yearlyIncome: 0,
    tokenPrice: 0,
    tokensAvailable: 0,
    totalTokens: 0,
    fundingGoal: 0,
    currentFunding: 0,
    investorCount: 0,
    features: [],
    images: [
      {
        id: 1,
        real_estate_id: 1,
        image_url: 'https://image-proxy.binaryx.com/@media/_big%2FoffPlan%2F2025-1%2Fv-3_h-0x9a61c2957362416f001b1c9923ac16bb464ca23e5efd7bb0811e605ecc0270bb_n-Group_1000011134_min.jpg'
      }
    ],
    minInvestment: 1000,
    maxInvestment: 50000,
    expectedRoi: 8
  };

  private isTouchDevice = false;
  public isMobile = false;

  constructor(private router: Router, private el: ElementRef) {
    // Detect if we're on a touch device
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  ngOnDestroy(): void {

  }

  private checkScreenSize(): void {

    const mobileBreakpoint = 768;
    
    const windowWidth = window.innerWidth;
    this.isMobile = windowWidth <= mobileBreakpoint;
  }

  @HostListener('touchstart')
  onTouchStart() {
    if (this.isTouchDevice) {
      this.el.nativeElement.querySelector('.real-estate-card').classList.add('touched');
    }
  }

  @HostListener('touchend')
  onTouchEnd() {
    if (this.isTouchDevice) {
      setTimeout(() => {
        this.el.nativeElement.querySelector('.real-estate-card').classList.remove('touched');
      }, 150);
    }
  }

  formatPrice(price: number): string {
 
    if (this.isMobile && price >= 1000000) {
      if (price % 1000000 === 0) {
        return (price / 1000000) + 'M';
      }

      return (price / 1000000).toFixed(1) + 'M';
    }
    
    return price.toLocaleString('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  navigateToDetails(): void {
    this.router.navigate(['/realestate/details/', this.realEstate.id]);
  }
}
