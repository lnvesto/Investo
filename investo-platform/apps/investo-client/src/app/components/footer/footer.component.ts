import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
  currentYear = new Date().getFullYear();
  emailAddress: string = '';
  subscribeSuccess: boolean = false;
  subscribeError: boolean = false;

  ngOnInit(): void {
    // Initialize component
  }

  ngAfterViewInit(): void {
    // Add scroll animation similar to main page
    this.initScrollAnimations();
  }

  subscribeToNewsletter(): void {
    // Simple validation
    if (!this.emailAddress || !this.emailAddress.includes('@')) {
      this.subscribeError = true;
      setTimeout(() => {
        this.subscribeError = false;
      }, 3000);
      return;
    }

    // In a real app, this would call an API service
    // For now, just simulate a successful subscription
    console.log('Subscribing email:', this.emailAddress);
    this.subscribeSuccess = true;
    this.emailAddress = '';
    
    // Reset success message after a few seconds
    setTimeout(() => {
      this.subscribeSuccess = false;
    }, 5000);
  }

  private initScrollAnimations(): void {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
          element.classList.add('animate');
        }
      });
    };

    // Run on load
    animateOnScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', animateOnScroll);
  }
}
