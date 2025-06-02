import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private particles: any[] = [];
  private animationFrame: number | null = null;
  private resizeListener: (() => void) | null = null;
  private scrollListener: (() => void) | null = null;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    
    setTimeout(() => {
      this.initializeAnimations();
    }, 0);
  }

  ngAfterViewInit() {
    this.initParticles();
    this.startParticleAnimation();
    this.setupScrollIndicator();
    
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.updateParticles();
    });
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      this.resizeListener();
    }
    
    if (this.scrollListener) {
      this.scrollListener();
    }
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
  
  private initializeAnimations() {
    
    const heroElements = this.el.nativeElement.querySelectorAll('.scroll-fade-in');
    heroElements.forEach((element: HTMLElement) => {
      element.classList.add('animate');
    });
  }

  private initParticles() {
    const particlesContainer = this.el.nativeElement.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    
    let particleCount = 50;
    
    
    if (window.innerWidth <= 768) {
      particleCount = 25; 
    } else if (window.innerWidth <= 1024) {
      particleCount = 35; 
    }
    
    for (let i = 0; i < particleCount; i++) {
      const particle = this.renderer.createElement('div');
      
      
      const size = Math.random() * (window.innerWidth <= 768 ? 3 : 5) + 1;
      const posX = Math.random() * containerWidth;
      const posY = Math.random() * containerHeight;
      const opacity = Math.random() * 0.5 + 0.1;
      
      
      this.renderer.setStyle(particle, 'position', 'absolute');
      this.renderer.setStyle(particle, 'width', `${size}px`);
      this.renderer.setStyle(particle, 'height', `${size}px`);
      this.renderer.setStyle(particle, 'background-color', 'rgba(255, 255, 255, ' + opacity + ')');
      this.renderer.setStyle(particle, 'border-radius', '50%');
      this.renderer.setStyle(particle, 'top', `${posY}px`);
      this.renderer.setStyle(particle, 'left', `${posX}px`);
      this.renderer.setStyle(particle, 'pointer-events', 'none');
      
      
      this.renderer.appendChild(particlesContainer, particle);
      
      
      const speedFactor = window.innerWidth <= 768 ? 0.3 : 0.5;
      
      this.particles.push({
        element: particle,
        size,
        posX,
        posY,
        speed: Math.random() * speedFactor + 0.1,
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
        
        const radians = particle.direction * Math.PI / 180;
        particle.posX += Math.cos(radians) * particle.speed;
        particle.posY += Math.sin(radians) * particle.speed;
        
        
        this.renderer.setStyle(particle.element, 'left', `${particle.posX}px`);
        this.renderer.setStyle(particle.element, 'top', `${particle.posY}px`);
        
        
        if (Math.random() < 0.01) {
          particle.direction = Math.random() * 360;
        }
      });
      
      this.animationFrame = requestAnimationFrame(animateParticles);
    };
    
    this.animationFrame = requestAnimationFrame(animateParticles);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  private setupScrollIndicator() {
    const scrollIndicator = this.el.nativeElement.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    
    if (window.innerWidth <= 768) {
      this.renderer.addClass(scrollIndicator, 'hidden');
      return;
    }
    
    
    if (window.scrollY > 20) {
      this.renderer.addClass(scrollIndicator, 'hidden');
    } else {
      this.renderer.removeClass(scrollIndicator, 'hidden');
    }
    
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    this.scrollListener = this.renderer.listen('window', 'scroll', () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastScrollY > 20) {
            this.renderer.addClass(scrollIndicator, 'hidden');
          } else {
            this.renderer.removeClass(scrollIndicator, 'hidden');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }
} 