import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RealEstateCardComponent } from "../../components/real-estate-card/real-estate-card.component";
import { RealEstate } from "../../models/real-estate.model";
import { RealEstateService } from "../../services/real-estate.service";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterModule, RealEstateCardComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterViewInit {
  features = [
    {
      title: 'Smart Contract Investment',
      description: 'Automated, secure, and transparent investments powered by blockchain smart contracts',
      icon: 'description'
    },
    {
      title: 'Multi-Chain Support',
      description: 'Invest across multiple blockchains including Ethereum, Solana, Polygon, and more',
      icon: 'account_tree'
    },
    {
      title: 'Decentralized Security',
      description: 'Your assets are protected by state-of-the-art blockchain security and cryptography',
      icon: 'security'
    }
  ];

  stats = [
    { value: '$250M+', label: 'Total Investments' },
    { value: '5+', label: 'Blockchain Networks' },
    { value: '1,500+', label: 'Active Investors' }
  ];

  realEstateListings: RealEstate[] = [];

  constructor(private realEstateService: RealEstateService) {}

  ngOnInit() {
    this.checkScrollAnimation();

    this.realEstateService.getFeaturedRealEstate().subscribe(listings => {
      this.realEstateListings = listings;
    });
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.checkScrollAnimation);
    
    setTimeout(() => {
      this.checkScrollAnimation();
    }, 100);
  }

  checkScrollAnimation = () => {
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in'
    );
    
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect();
      
      const isInViewport = 
        elementPosition.top < window.innerHeight - 100 && 
        elementPosition.bottom >= 0;
      
      if (isInViewport) {
        element.classList.add('animate');
      }
    });
  }

  viewMoreProperties() {
    console.log('View more properties clicked');
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}