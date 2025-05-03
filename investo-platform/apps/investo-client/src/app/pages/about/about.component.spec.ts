import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have team members defined', () => {
    expect(component.teamMembers).toBeDefined();
    expect(component.teamMembers.length).toBeGreaterThan(0);
  });

  it('should have milestones defined', () => {
    expect(component.milestones).toBeDefined();
    expect(component.milestones.length).toBeGreaterThan(0);
  });

  it('should have partners defined', () => {
    expect(component.partners).toBeDefined();
    expect(component.partners.length).toBeGreaterThan(0);
  });
});
