import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User, Transaction, Investment, ProfileStats } from '../../models/profile.model';
import { ProfileUtilsService } from '../../services/profile-utils.service';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit {
  @Input() user!: User;
  @Input() stats!: ProfileStats;
  @Input() recentTransactions: Transaction[] = [];
  @Input() activeInvestmentsWithPayouts: any[] = [];
  @Input() hasActiveInvestmentsWithPayouts: boolean = false;

  constructor(public utils: ProfileUtilsService) {}

  ngOnInit(): void {
    // Any initialization logic specific to the overview tab
  }
}