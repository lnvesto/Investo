import { Component, HostListener, OnInit, Renderer2, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isUserMenuOpen = false;
  isMobile = false;
  isScrolled = false;
  scrollThreshold = 20;
  isDarkPage = false;
  isTablet = false;

  
  private readonly MOBILE_BREAKPOINT = 768;
  private readonly TABLET_BREAKPOINT = 1024;

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef,
    private router: Router,
    public authService: AuthService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (scrollPosition > this.scrollThreshold && !this.isScrolled) {
      this.isScrolled = true;
      this.renderer.addClass(this.el.nativeElement.querySelector('.header'), 'scrolled');
    } else if (scrollPosition <= this.scrollThreshold && this.isScrolled && !this.isDarkPage) {
      this.isScrolled = false;
      this.renderer.removeClass(this.el.nativeElement.querySelector('.header'), 'scrolled');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    
    if (this.isUserMenuOpen) {
      const userAccountEl = this.el.nativeElement.querySelector('.user-account');
      if (userAccountEl && !userAccountEl.contains(event.target)) {
        this.isUserMenuOpen = false;
      }
    }
  }

  ngOnInit() {
    this.checkScreenSize();
    this.checkCurrentRoute(this.router.url);
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkCurrentRoute(event.url);
        this.closeMenu(); 
        this.isUserMenuOpen = false; 
      });
      
    this.onWindowScroll();
  }

  checkCurrentRoute(url: string) {
    const darkHeaderRoutes = [
      '/investments/',
      '/real-estate-details/',
      '/blockchain/'
    ];
    
    this.isDarkPage = darkHeaderRoutes.some(route => url.includes(route));
    
    const headerElement = this.el.nativeElement.querySelector('.header');
    
    if (this.isDarkPage) {
      this.isScrolled = true;
      this.renderer.addClass(headerElement, 'scrolled');
    } else if (!this.isScrolled) {
      this.renderer.removeClass(headerElement, 'scrolled');
    }
  }

  checkScreenSize() {
    const width = window.innerWidth;
    this.isMobile = width <= this.MOBILE_BREAKPOINT;
    this.isTablet = width > this.MOBILE_BREAKPOINT && width <= this.TABLET_BREAKPOINT;
    
    if (!this.isMobile && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
    
    
    if (this.isUserMenuOpen) {
      setTimeout(() => {
        const menuLinks = this.el.nativeElement.querySelectorAll('.account-dropdown .menu-link');
        menuLinks.forEach((link: HTMLElement, index: number) => {
          setTimeout(() => {
            link.classList.add('animate-in');
          }, 50 * index); 
        });
      }, 150); 
    }
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.updateBodyScroll();
    }
  }

  private updateBodyScroll() {
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenuIfMobile() {
    if (this.isMobile) {
      this.closeMenu();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMenuIfMobile();
    this.isUserMenuOpen = false;
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}