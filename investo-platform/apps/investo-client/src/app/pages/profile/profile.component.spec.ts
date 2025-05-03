import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.activeTab).toBe('overview');
    expect(component.viewMode).toBe('cards');
    expect(component.investmentFilter).toBe('all');
  });

  it('should format currency correctly', () => {
    expect(component.formatCurrency(1000)).toBe('$1,000');
    expect(component.formatCurrency(1000000)).toBe('$1,000,000');
  });

  it('should format date correctly', () => {
    const date = new Date('2024-01-01');
    expect(component.formatDate(date)).toContain('Jan 1, 2024');
  });

  it('should truncate wallet address correctly', () => {
    const address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
    expect(component.truncateAddress(address)).toBe('0x71C7...976F');
  });

  it('should filter investments correctly', () => {
    component.setInvestmentFilter('active');
    const filtered = component.getFilteredInvestments();
    expect(filtered.every(inv => inv.status === 'active')).toBeTrue();
  });

  it('should change active tab', () => {
    component.setActiveTab('wallet');
    expect(component.activeTab).toBe('wallet');
  });

  it('should change view mode', () => {
    component.setViewMode('list');
    expect(component.viewMode).toBe('list');
  });

  it('should get correct transaction icon', () => {
    expect(component.getTransactionIcon('deposit')).toBe('arrow_downward');
    expect(component.getTransactionIcon('withdrawal')).toBe('arrow_upward');
    expect(component.getTransactionIcon('investment')).toBe('account_balance');
  });

  it('should get correct status class', () => {
    expect(component.getStatusClass('active')).toBe('status-active');
    expect(component.getStatusClass('pending')).toBe('status-pending');
    expect(component.getStatusClass('completed')).toBe('status-completed');
  });
});
