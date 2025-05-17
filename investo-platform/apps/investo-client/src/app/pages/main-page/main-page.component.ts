import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RealEstateCardComponent } from "../../components/real-estate-card/real-estate-card.component";
import { RealEstate } from "../../models/real-estate.model";
import { RealEstateService } from "../../services/real-estate.service";
import { HeroSectionComponent } from "../../components/sections/hero-section/hero-section.component";
import { FeaturesSectionComponent } from "../../components/sections/features-section/features-section.component";
import { FaqComponent } from '../../components/sections/faq/faq.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    RealEstateCardComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    FaqComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {
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



  realEstateListings: RealEstate[] = [];
  private scrollListener: (() => void) | null = null;
  private resizeListener: (() => void) | null = null;
  private particles: any[] = [];
  private animationFrame: number | null = null;

  constructor(
    private realEstateService: RealEstateService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    // Trigger animations immediately to fix bug when returning from other pages
    setTimeout(() => {
      this.checkScrollAnimation();
    }, 0);
    
    this.initParticles();

    this.realEstateService.getFeaturedRealEstate().subscribe(listings => {
      this.realEstateListings = listings;
    });
  }

  ngAfterViewInit() {
    this.scrollListener = this.renderer.listen('window', 'scroll', () => {
      this.checkScrollAnimation();
      this.parallaxEffect();
    });
    
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.updateParticles();
    });
    
    // Add another trigger after the view is fully initialized
    this.checkScrollAnimation();
    this.startParticleAnimation();
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      this.scrollListener();
    }
    
    if (this.resizeListener) {
      this.resizeListener();
    }
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  checkScrollAnimation = () => {
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in'
    );
    
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect();
      
      // For elements in the hero section, always animate them
      if (element.closest('.hero-section')) {
        element.classList.add('animate');
        return;
      }
      
      // For other elements, check if they're in viewport
      const isInViewport = 
        elementPosition.top < window.innerHeight - 50 && 
        elementPosition.bottom >= 0;
      
      if (isInViewport) {
        element.classList.add('animate');
      } else {
        // Optional: remove class if you want animations to re-trigger on scroll up/down
        // element.classList.remove('animate'); 
      }
    });
  }

  private parallaxEffect() {
    const parallaxElements = document.querySelectorAll('.feature-card, .stat-card');
    const scrollY = window.scrollY;
    
    parallaxElements.forEach((element: any) => {
      const elementTop = element.getBoundingClientRect().top + scrollY;
      const elementCenter = elementTop + element.offsetHeight / 2;
      const distanceFromCenter = scrollY + window.innerHeight / 2 - elementCenter;
      const parallaxValue = distanceFromCenter * 0.05;
      
      if (Math.abs(distanceFromCenter) < window.innerHeight) {
        this.renderer.setStyle(element, 'transform', `translateY(${Math.min(Math.max(parallaxValue, -20), 20)}px)`);
      }
    });
  }

  private initParticles() {
    const particlesContainer = this.el.nativeElement.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = this.renderer.createElement('div');
      
      // Random particle properties
      const size = Math.random() * 5 + 1;
      const posX = Math.random() * containerWidth;
      const posY = Math.random() * containerHeight;
      const opacity = Math.random() * 0.5 + 0.1;
      
      // Set particle styles
      this.renderer.setStyle(particle, 'position', 'absolute');
      this.renderer.setStyle(particle, 'width', `${size}px`);
      this.renderer.setStyle(particle, 'height', `${size}px`);
      this.renderer.setStyle(particle, 'background-color', 'rgba(255, 255, 255, ' + opacity + ')');
      this.renderer.setStyle(particle, 'border-radius', '50%');
      this.renderer.setStyle(particle, 'top', `${posY}px`);
      this.renderer.setStyle(particle, 'left', `${posX}px`);
      this.renderer.setStyle(particle, 'pointer-events', 'none');
      
      // Add to DOM
      this.renderer.appendChild(particlesContainer, particle);
      
      // Store particle data
      this.particles.push({
        element: particle,
        size,
        posX,
        posY,
        speed: Math.random() * 0.5 + 0.1,
        direction: Math.random() * 360
      });
    }
  }

  private updateParticles() {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    this.particles.forEach(particle => {
      if (particle.posX > containerWidth) {
        particle.posX = 0;
      } else if (particle.posX < 0) {
        particle.posX = containerWidth;
      }
      
      if (particle.posY > containerHeight) {
        particle.posY = 0;
      } else if (particle.posY < 0) {
        particle.posY = containerHeight;
      }
      
      this.renderer.setStyle(particle.element, 'left', `${particle.posX}px`);
      this.renderer.setStyle(particle.element, 'top', `${particle.posY}px`);
    });
  }

  private startParticleAnimation() {
    const animateParticles = () => {
      this.particles.forEach(particle => {
        // Calculate new position
        const radians = particle.direction * Math.PI / 180;
        particle.posX += Math.cos(radians) * particle.speed;
        particle.posY += Math.sin(radians) * particle.speed;
        
        // Update DOM element
        this.renderer.setStyle(particle.element, 'left', `${particle.posX}px`);
        this.renderer.setStyle(particle.element, 'top', `${particle.posY}px`);
        
        // Randomly change direction occasionally
        if (Math.random() < 0.01) {
          particle.direction = Math.random() * 360;
        }
      });
      
      this.animationFrame = requestAnimationFrame(animateParticles);
    };
    
    this.animationFrame = requestAnimationFrame(animateParticles);
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