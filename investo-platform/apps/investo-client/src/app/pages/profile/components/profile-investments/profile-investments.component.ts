import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Investment } from '../../models/profile.model';
import { ProfileUtilsService } from '../../services/profile-utils.service';
import { RealEstateCardComponent } from '../../../../components/real-estate-card/real-estate-card.component';

@Component({
  selector: 'app-profile-investments',
  standalone: true,
  imports: [CommonModule, RouterModule, RealEstateCardComponent],
  templateUrl: './profile-investments.component.html',
  styleUrls: ['./profile-investments.component.scss']
})
export class ProfileInvestmentsComponent implements OnInit {
  @Input() investments: Investment[] = [];
  
  viewMode = 'cards';
  investmentFilter = 'all';

  constructor(public utils: ProfileUtilsService) {}

  ngOnInit(): void {
    // Initialization logic for investments tab
  }

  setInvestmentFilter(filter: string): void {
    this.investmentFilter = filter;
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
  }

  getFilteredInvestments(): Investment[] {
    if (this.investmentFilter === 'all') {
      return this.investments;
    }
    return this.investments.filter(investment => investment.status === this.investmentFilter);
  }

  convertToRealEstate(investment: Investment): any {
    return {
      id: investment.id,
      title: investment.propertyName,
      location: investment.location,
      category: 'Investment',
      price: investment.investedAmount,
      images: [{ image_url: investment.imageUrl }],
      roi: investment.roi,
      currentValue: investment.currentValue,
      status: investment.status
    };
  }
}