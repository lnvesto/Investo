import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RealEstate } from '../../models/real-estate.model';
import { RealEstateService } from '../../services/real-estate.service';
import { RealEstateCardComponent } from '../../components/real-estate-card/real-estate-card.component';

@Component({
  selector: 'app-real-estates-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RealEstateCardComponent],
  templateUrl: './real-estates-page.component.html',
  styleUrl: './real-estates-page.component.scss'
})
export class RealEstatesPageComponent implements OnInit {
  // Properties for real estate listings
  realEstateListings: RealEstate[] = [];
  filteredListings: RealEstate[] = [];

  // Filter properties
  propertyTypes: string[] = [];
  locations: string[] = [];
  buildingStatuses: string[] = [];
  selectedTypes: {[key: string]: boolean} = {};
  selectedLocations: {[key: string]: boolean} = {};
  selectedStatuses: {[key: string]: boolean} = {};
  priceRange: number = 100000000;
  maxPrice: number = 100000000;
  minRoi: number = 5;
  sortOption: string = 'newest';

  constructor(private realEstateService: RealEstateService) {}

  ngOnInit() {
    // Get all real estate listings
    this.realEstateService.getAllRealEstate().subscribe(listings => {
      this.realEstateListings = listings;
      this.filteredListings = [...listings];
      
      // Extract unique property types, locations, and statuses for filters
      this.extractFilterOptions();
      
      // Find max price for range slider
      this.maxPrice = Math.max(...listings.map(item => item.price));
      this.priceRange = this.maxPrice;
    });
  }

  extractFilterOptions() {
    // Extract unique property types
    this.propertyTypes = [...new Set(this.realEstateListings.map(item => item.category))];
    this.propertyTypes.forEach(type => this.selectedTypes[type] = false);

    // Extract unique locations
    this.locations = [...new Set(this.realEstateListings.map(item => item.location))];
    this.locations.forEach(location => this.selectedLocations[location] = false);

    // Extract unique building statuses
    this.buildingStatuses = [...new Set(
      this.realEstateListings
        .filter(item => item.buildingStatus)
        .map(item => item.buildingStatus!.status)
    )];
    this.buildingStatuses.forEach(status => this.selectedStatuses[status] = false);
  }

  applyFilters() {
    let result = [...this.realEstateListings];

    // Filter by property type
    const selectedTypeCount = Object.values(this.selectedTypes).filter(Boolean).length;
    if (selectedTypeCount > 0) {
      result = result.filter(item => 
        this.selectedTypes[item.category]
      );
    }

    // Filter by location
    const selectedLocationCount = Object.values(this.selectedLocations).filter(Boolean).length;
    if (selectedLocationCount > 0) {
      result = result.filter(item => 
        this.selectedLocations[item.location]
      );
    }

    // Filter by status
    const selectedStatusCount = Object.values(this.selectedStatuses).filter(Boolean).length;
    if (selectedStatusCount > 0) {
      result = result.filter(item => 
        item.buildingStatus && this.selectedStatuses[item.buildingStatus.status]
      );
    }

    // Filter by price range
    result = result.filter(item => item.price <= this.priceRange);

    // Filter by ROI
    result = result.filter(item => item.roi >= this.minRoi);

    // Apply sorting
    this.filteredListings = result;
    this.sortListings();
  }

  sortListings() {
    switch (this.sortOption) {
      case 'priceAsc':
        this.filteredListings.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredListings.sort((a, b) => b.price - a.price);
        break;
      case 'roiDesc':
        this.filteredListings.sort((a, b) => b.roi - a.roi);
        break;
      case 'newest':
        this.filteredListings.sort((a, b) => 
          b.publishDate.getTime() - a.publishDate.getTime());
        break;
    }
  }

  resetFilters() {
    // Reset all filter selections
    Object.keys(this.selectedTypes).forEach(key => this.selectedTypes[key] = false);
    Object.keys(this.selectedLocations).forEach(key => this.selectedLocations[key] = false);
    Object.keys(this.selectedStatuses).forEach(key => this.selectedStatuses[key] = false);
    this.priceRange = this.maxPrice;
    this.minRoi = 5;
    this.sortOption = 'newest';
    
    // Reset filtered listings to all listings
    this.filteredListings = [...this.realEstateListings];
    this.sortListings();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}
