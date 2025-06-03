import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.scss']
})
export class FeaturesSectionComponent implements OnInit {
  @Input() features: Feature[] = [
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

  ngOnInit() {
    
    if (window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.checkScrollAnimation();
    } else {
      
      window.addEventListener('scroll', this.checkScrollAnimation, { passive: true });
      this.checkScrollAnimation();
    }
  }
  
  ngOnDestroy() {
    
    window.removeEventListener('scroll', this.checkScrollAnimation);
  }

  
  private observer: IntersectionObserver | undefined;
  private handleScroll = () => {};
  
  private checkScrollAnimation = () => {
    
    if (window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      
      document.querySelectorAll('.scroll-fade-in, .scroll-scale-in').forEach(el => {
        el.classList.add('animate');
        (el as HTMLElement).style.transition = 'none';
        (el as HTMLElement).style.transform = 'none';
        (el as HTMLElement).style.opacity = '1';
      });
      return;
    }
    
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-scale-in'
    );
    
    if ('IntersectionObserver' in window) {
      // Use intersection observer for better performance
      if (this.observer) {
        this.observer.disconnect();
      }
      
      this.observer = new IntersectionObserver((entries) => {
        // Process entries in batches with requestAnimationFrame to avoid layout thrashing
        if (entries.length > 0) {
          requestAnimationFrame(() => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                this.observer?.unobserve(entry.target);
              }
            });
          });
        }
      }, { 
        threshold: 0.1, 
        rootMargin: '20px 0px' 
      });
      
      // Add elements to be observed
      animatedElements.forEach(element => {
        this.observer?.observe(element);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      let ticking = false;
      
      this.handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            let elementsToAnimate: Element[] = [];
            
            // Batch DOM reads first
            animatedElements.forEach((element) => {
              const elementPosition = element.getBoundingClientRect();
              const isInViewport = 
                elementPosition.top < window.innerHeight - 50 && 
                elementPosition.bottom >= 0;
              
              if (isInViewport) {
                elementsToAnimate.push(element);
              }
            });
            
            // Then batch DOM writes
            elementsToAnimate.forEach(element => {
              element.classList.add('animate');
            });
            
            ticking = false;
          });
          ticking = true;
        }
      };
      
      this.handleScroll();
      // Use the correct type annotation for window to prevent the TypeScript error
      (window as Window).addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }
}