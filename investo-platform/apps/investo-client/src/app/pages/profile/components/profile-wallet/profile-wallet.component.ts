import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Transaction } from '../../models/profile.model';
import { ProfileUtilsService } from '../../services/profile-utils.service';

@Component({
  selector: 'app-profile-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-wallet.component.html',
  styleUrls: ['./profile-wallet.component.scss']
})
export class ProfileWalletComponent implements OnInit {
  @Input() walletBalance: number = 0;
  @Input() availableTokens: number = 0;
  @Input() tokenPrice: number = 0;
  @Input() walletTransactions: Transaction[] = [];

  constructor(public utils: ProfileUtilsService) {}

  ngOnInit(): void {
    // Initialization logic for wallet tab
  }
}