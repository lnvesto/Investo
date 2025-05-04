import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../models/profile.model';
import { ProfileUtilsService } from '../../services/profile-utils.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  @Input() user!: User;
  @ViewChild('avatarImage') avatarImage!: ElementRef;
  avatarLoadError = false;

  constructor(public utils: ProfileUtilsService) {}

  ngOnInit(): void {
    // Initialization logic for settings tab
  }

  onAvatarError(event: Event): void {
    this.avatarLoadError = true;
    if (this.avatarImage) {
      this.avatarImage.nativeElement.style.display = 'none';
    }
  }
}