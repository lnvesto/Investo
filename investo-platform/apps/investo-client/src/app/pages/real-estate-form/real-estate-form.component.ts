import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RealEstate, RealEstateImage } from '../../models/real-estate.model';
import { RealEstateService } from '../../services/real-estate.service';

@Component({
  selector: 'app-real-estate-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './real-estate-form.component.html',
  styleUrl: './real-estate-form.component.scss'
})
export class RealEstateFormComponent implements OnInit {
  realEstateForm!: FormGroup;
  isLoading = true;
  isSubmitting = false;
  errorMessage: string | null = null;
  imagePreviewUrls: string[] = [];
  
  // Predefined options 
  categories: string[] = [
    'Residential',
    'Commercial',
    'Industrial',
    'Apartment',
    'Luxury Villa',
    'Land',
    'Retail',
    'Office',
    'Mixed-Use',
    'Construction'
  ];
  
  buildingStatuses: string[] = [
    'Planning',
    'Under Construction',
    'Completed'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private realEstateService: RealEstateService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.isLoading = false;
    window.scrollTo(0, 0);
  }

  initForm(): void {
    this.realEstateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      area: [null, [Validators.required, Validators.min(1)]],
      
      images: this.fb.array([
        this.createImageFormGroup()
      ]),
      
      features: this.fb.array([
        this.createFeatureFormGroup()
      ]),
      
      tokenPrice: [null, [Validators.required, Validators.min(1)]],
      totalTokens: [null, [Validators.required, Validators.min(1)]],
      tokensAvailable: [null, [Validators.required, Validators.min(1)]],
      price: [{value: null, disabled: true}],
      fundingGoal: [{value: null, disabled: true}],
      yearlyIncome: [null, [Validators.required, Validators.min(1)]],
      minInvestment: [null, [Validators.required, Validators.min(1)]],
      maxInvestment: [null, [Validators.required, Validators.min(1)]],
      roi: [null, [Validators.required, Validators.min(0.1), Validators.max(100)]],
      expectedRoi: [null, [Validators.required, Validators.min(0.1), Validators.max(100)]],
      
      buildingStatus: this.fb.group({
        status: ['Under Construction', Validators.required],
        completionDate: [null, Validators.required],
        completionPercentage: [{value: 0, disabled: true}],
        stages: this.fb.array([
          this.createStageFormGroup()
        ])
      })
    });
  }

  // Form arrays getters
  get imagesArray(): FormArray {
    return this.realEstateForm.get('images') as FormArray;
  }

  get featuresArray(): FormArray {
    return this.realEstateForm.get('features') as FormArray;
  }

  get stagesArray(): FormArray {
    return this.realEstateForm.get('buildingStatus.stages') as FormArray;
  }

  // Create form groups for arrays
  createImageFormGroup(): FormGroup {
    return this.fb.group({
      image_url: ['', Validators.required]
    });
  }

  createFeatureFormGroup(): FormGroup {
    return this.fb.group({
      feature: ['', Validators.required]
    });
  }

  createStageFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false]
    });
  }

  // Add/remove form array items
  addImage(): void {
    this.imagesArray.push(this.createImageFormGroup());
    this.imagePreviewUrls.push('');
  }

  removeImage(index: number): void {
    this.imagesArray.removeAt(index);
    this.imagePreviewUrls.splice(index, 1);
  }

  addFeature(): void {
    this.featuresArray.push(this.createFeatureFormGroup());
  }

  removeFeature(index: number): void {
    this.featuresArray.removeAt(index);
  }

  addStage(): void {
    this.stagesArray.push(this.createStageFormGroup());
    this.onStageCompletionChange();
  }

  removeStage(index: number): void {
    this.stagesArray.removeAt(index);
    this.onStageCompletionChange();
  }

  // Handle image preview
  onImageUrlChange(index: number): void {
    const imageUrl = this.imagesArray.at(index).get('image_url')?.value;
    if (imageUrl && imageUrl.trim() !== '') {
      this.imagePreviewUrls[index] = imageUrl;
    } else {
      this.imagePreviewUrls[index] = '';
    }
  }

  // Calculate property values
  calculateTotalValue(): void {
    const tokenPrice = this.realEstateForm.get('tokenPrice')?.value || 0;
    const totalTokens = this.realEstateForm.get('totalTokens')?.value || 0;
    
    if (tokenPrice > 0 && totalTokens > 0) {
      const totalValue = tokenPrice * totalTokens;
      this.realEstateForm.get('price')?.setValue(totalValue);
      this.realEstateForm.get('fundingGoal')?.setValue(totalValue);
    } else {
      this.realEstateForm.get('price')?.setValue(null);
      this.realEstateForm.get('fundingGoal')?.setValue(null);
    }
  }

  // Building status handling
  onStatusChange(): void {
    const status = this.realEstateForm.get('buildingStatus.status')?.value;
    
    if (status === 'Completed') {
      this.realEstateForm.get('buildingStatus.completionPercentage')?.setValue(100);
      
      // Mark all stages as completed
      for (let i = 0; i < this.stagesArray.length; i++) {
        this.stagesArray.at(i).get('completed')?.setValue(true);
      }
    } else if (status === 'Planning') {
      // Set a lower default percentage
      this.realEstateForm.get('buildingStatus.completionPercentage')?.setValue(10);
    } else {
      // Recalculate based on stages
      this.onStageCompletionChange();
    }
  }

  onStageCompletionChange(): void {
    const stages = this.stagesArray.controls;
    if (stages.length === 0) {
      this.realEstateForm.get('buildingStatus.completionPercentage')?.setValue(0);
      return;
    }
    
    const completedStages = stages.filter(stage => stage.get('completed')?.value === true).length;
    const completionPercentage = Math.round((completedStages / stages.length) * 100);
    
    this.realEstateForm.get('buildingStatus.completionPercentage')?.setValue(completionPercentage);
  }

  // Form submission
  onSubmit(): void {
    if (this.realEstateForm.invalid) {
      this.markFormGroupTouched(this.realEstateForm);
      this.errorMessage = 'Please correct the errors in the form before submitting.';
      window.scrollTo(0, 0);
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = null;
    
    // Prepare form data
    const formData = this.prepareFormData();
    
    try {
      // Here you would normally call a service to save the data
      console.log('Submitting real estate data:', formData);
      
      // Simulate a successful submission after 1.5 seconds
      setTimeout(() => {
        this.isSubmitting = false;
        // Navigate to a success page or back to the listing
        this.router.navigate(['/']);
      }, 1500);
    } catch (error) {
      this.isSubmitting = false;
      this.errorMessage = 'An error occurred while submitting the form. Please try again.';
      console.error('Error submitting form:', error);
    }
  }

  prepareFormData(): Partial<RealEstate> {
    const formValue = this.realEstateForm.getRawValue();
    
    // Extract features from form array
    const features = formValue.features.map((item: any) => item.feature);
    
    // Process images
    const images: RealEstateImage[] = formValue.images.map((item: any, index: number) => ({
      id: index + 1, // Temporary ID, would be assigned by backend
      real_estate_id: 0, // Temporary ID, would be assigned by backend
      image_url: item.image_url
    }));
    
    // Create the real estate object
    const realEstate: Partial<RealEstate> = {
      title: formValue.title,
      description: formValue.description,
      publishDate: new Date(),
      price: formValue.price,
      location: formValue.location,
      category: formValue.category,
      area: formValue.area,
      roi: formValue.roi,
      yearlyIncome: formValue.yearlyIncome,
      tokenPrice: formValue.tokenPrice,
      tokensAvailable: formValue.tokensAvailable,
      totalTokens: formValue.totalTokens,
      fundingGoal: formValue.fundingGoal,
      currentFunding: 0, // New listing starts with 0 funding
      investorCount: 0, // New listing starts with 0 investors
      features: features,
      images: images,
      minInvestment: formValue.minInvestment,
      maxInvestment: formValue.maxInvestment,
      expectedRoi: formValue.expectedRoi,
      buildingStatus: {
        status: formValue.buildingStatus.status,
        completionDate: new Date(formValue.buildingStatus.completionDate),
        completionPercentage: formValue.buildingStatus.completionPercentage,
        stages: formValue.buildingStatus.stages
      }
    };
    
    return realEstate;
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        for (let i = 0; i < control.length; i++) {
          if (control.at(i) instanceof FormGroup) {
            this.markFormGroupTouched(control.at(i) as FormGroup);
          }
        }
      }
    });
  }
}