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
    
    window.addEventListener('scroll', this.checkScrollAnimation);
    
    this.checkScrollAnimation();
  }

  
  private checkScrollAnimation = () => {
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-scale-in'
    );
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); 
          }
        });
      }, { threshold: 0.1 }); 

      animatedElements.forEach(element => observer.observe(element));
    } else {
      
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
  }
}