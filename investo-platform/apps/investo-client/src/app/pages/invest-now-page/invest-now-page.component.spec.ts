import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestNowPageComponent } from './invest-now-page.component';

describe('InvestNowPageComponent', () => {
  let component: InvestNowPageComponent;
  let fixture: ComponentFixture<InvestNowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestNowPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestNowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
