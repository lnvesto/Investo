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

  
  private handleScroll: () => void = () => {};
  
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
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            
            requestAnimationFrame(() => {
              entry.target.classList.add('animate');
            });
            observer.unobserve(entry.target); 
          }
        });
      }, { 
        threshold: 0.1,
        rootMargin: '20px 0px' 
      }); 

      
      let ticking = false;
      
      
      this.handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            animatedElements.forEach((element) => {
              const elementPosition = element.getBoundingClientRect();
              const isInViewport = 
                elementPosition.top < window.innerHeight - 50 && 
                elementPosition.bottom >= 0;
              
              if (isInViewport) {
                element.classList.add('animate');
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      };
      
      this.handleScroll(); 
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }
}