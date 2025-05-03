import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatesPageComponent } from './real-estates-page.component';

describe('RealEstatesPageComponent', () => {
  let component: RealEstatesPageComponent;
  let fixture: ComponentFixture<RealEstatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealEstatesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
