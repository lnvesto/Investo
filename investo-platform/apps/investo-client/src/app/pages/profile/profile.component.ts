import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RealEstateService } from '../../services/real-estate.service';
import { RealEstate } from '../../models/real-estate.model';
import { ProfileUtilsService } from './services/profile-utils.service';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';
import { ProfileInvestmentsComponent } from './components/profile-investments/profile-investments.component';
import { ProfileWalletComponent } from './components/profile-wallet/profile-wallet.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { User, Investment, Transaction, ProfileStats } from './models/profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ProfileOverviewComponent,
    ProfileInvestmentsComponent,
    ProfileWalletComponent,
    ProfileSettingsComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  user: User = {
    id: '',
    name: '',
    email: '',
    avatarUrl: 'assets/images/avatar-placeholder.png',
    walletAddress: '0x0000000000000000000000000000000000000000',
    kycVerified: false,
    twoFactorEnabled: false,
    joinDate: new Date(),
    isPublicProfile: false
  };
  
  userId: string | null = null;
  isCurrentUser: boolean = true;
  isLoading: boolean = true;
  errorMessage: string = '';
  activeTab = 'overview';
  avatarLoadError = false;
  @ViewChild('avatarImage') avatarImage!: ElementRef;


  stats: ProfileStats = {
    totalInvested: 25000,
    totalReturns: 2750,
    activeInvestments: 3,
    averageROI: 11,
    investmentScore: 87
  };

  recentTransactions: Transaction[] = [
    { type: 'deposit', details: 'Deposit to wallet', date: new Date(2023, 3, 15), amount: 5000, status: 'completed' },
    { type: 'investment', details: 'Investment in Property A', date: new Date(2023, 3, 14), amount: 2500, status: 'completed' },
    { type: 'return', details: 'Return from Property B', date: new Date(2023, 3, 12), amount: 350, status: 'completed' }
  ];

  activeInvestmentsWithPayouts: any[] = [];

  walletBalance = 7500;
  availableTokens = 250;
  tokenPrice = 12.75;
  
  hasActiveInvestmentsWithPayouts = true;
  walletTransactions: Transaction[] = [];

  investments: Investment[] = [];
  realEstateList: RealEstate[] = [];

  constructor(
    private authService: AuthService, 
    private apiService: ApiService,
    private realEstateService: RealEstateService,
    private route: ActivatedRoute,
    private router: Router,
    public utils: ProfileUtilsService
  ) {}
  
  ngOnInit(): void {
    this.checkScrollAnimation();
    
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      
      if (idParam) {
        
        this.userId = idParam;
        
        
        this.authService.currentUser$.subscribe(currentUser => {
          if (currentUser) {
            this.isCurrentUser = currentUser.id === this.userId;
          } else {
            this.isCurrentUser = false;
          }
          
          
          this.loadUserProfile();
        });
      } else {
        
        this.isCurrentUser = true;
        
        
        this.authService.currentUser$.subscribe(currentUser => {
          if (currentUser) {
            this.userId = currentUser.id || null;
            this.loadUserProfile();
          } else {
            
            this.router.navigate(['/login']);
          }
        });
      }
    });
    
    
    this.loadRealEstateData();
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

  loadUserProfile(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    if (this.userId === null) {
      this.errorMessage = 'User ID not provided';
      this.isLoading = false;
      return;
    }
    
    const profileObservable = this.isCurrentUser ? 
      this.apiService.getMyProfile() : 
      this.apiService.getUserProfile(this.userId);
      
    profileObservable.pipe(
      catchError(error => {
        console.error('Error fetching profile:', error);
        this.errorMessage = this.isCurrentUser ? 
          'Failed to load your profile. Please try again.' :
          'User profile not found or you do not have permission to view it.';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe(profile => {
      if (profile) {
        this.user = this.mapProfileResponse(profile);
        console.log('Profile loaded:', this.user);
      }
    });
  }

  loadRealEstateData(): void {
    this.realEstateService.getAllRealEstate().subscribe(data => {
      this.realEstateList = data;
      
      
      this.investments = this.realEstateList.slice(0, 5).map(property => ({
        id: property.id.toString(),
        propertyName: property.title,
        location: property.location,
        imageUrl: property.images && property.images.length > 0 ? property.images[0].image_url : 'assets/images/property-placeholder.jpg',
        investedAmount: property.minInvestment ? property.minInvestment * 2 : 5000, 
        currentValue: property.minInvestment ? property.minInvestment * 2 * (1 + property.roi / 100) : 5500,
        roi: property.roi,
        status: 'active',
        investmentDate: new Date(Date.now() - Math.random() * 10000000000) 
      }));
      
      
      this.activeInvestmentsWithPayouts = this.realEstateList.slice(0, 3).map(property => ({
        id: property.id.toString(),
        propertyName: property.title,
        location: property.location,
        imageUrl: property.images && property.images.length > 0 ? property.images[0].image_url : 'assets/images/property-placeholder.jpg',
        investedAmount: property.minInvestment ? property.minInvestment * 2 : 5000,
        roi: property.roi,
        nextPayout: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000) 
      }));
      
      
      this.hasActiveInvestmentsWithPayouts = this.activeInvestmentsWithPayouts.length > 0;

      
      this.walletTransactions = [
        { type: 'deposit', details: 'Deposit to wallet', date: new Date(2023, 3, 20), amount: 2500, status: 'completed' },
        { type: 'withdrawal', details: 'Withdrawal to bank account', date: new Date(2023, 3, 18), amount: 1200, status: 'completed' },
        { type: 'investment', details: 'Investment in Property A', date: new Date(2023, 3, 16), amount: 3000, status: 'completed' },
        { type: 'return', details: 'Return from Property B', date: new Date(2023, 3, 14), amount: 450, status: 'completed' },
        { type: 'deposit', details: 'Deposit to wallet', date: new Date(2023, 3, 10), amount: 5000, status: 'completed' }
      ];
      
      
      if (this.investments.length > 0) {
        const totalInvested = this.investments.reduce((sum, inv) => sum + inv.investedAmount, 0);
        const totalCurrentValue = this.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
        const totalReturns = totalCurrentValue - totalInvested;
        const activeInvestments = this.investments.filter(inv => inv.status === 'active').length;
        const averageROI = this.investments.reduce((sum, inv) => sum + inv.roi, 0) / this.investments.length;
        
        this.stats = {
          totalInvested,
          totalReturns,
          activeInvestments,
          averageROI: Math.round(averageROI),
          investmentScore: 80 + Math.round(Math.random() * 20) 
        };
      }
    });
  }

  mapProfileResponse(profile: any): User {
    return {
      id: profile.id,
      name: profile.name || profile.fullName || '',
      email: profile.email || '',
      avatarUrl: profile.avatarUrl || 'assets/images/avatar-placeholder.png',
      walletAddress: profile.walletAddress || '0x0000000000000000000000000000000000000000',
      kycVerified: profile.kycVerified || false,
      twoFactorEnabled: profile.twoFactorEnabled || false,
      joinDate: profile.joinDate ? new Date(profile.joinDate) : new Date(),
      isPublicProfile: profile.isPublicProfile || false
    };
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onAvatarError(event: Event): void {
    this.avatarLoadError = true;
    if (this.avatarImage) {
      this.avatarImage.nativeElement.style.display = 'none';
    }
  }
}

