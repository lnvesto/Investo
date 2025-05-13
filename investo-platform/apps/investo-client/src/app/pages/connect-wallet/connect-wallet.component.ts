import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connect-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './connect-wallet.component.html',
  styleUrl: './connect-wallet.component.scss'
})
export class ConnectWalletComponent {
  constructor(public authService: AuthService) {}

  walletProviders = [
    {
      name: 'MetaMask',
      icon: 'assets/images/metamask.svg',
      description: 'Connect to your MetaMask wallet',
      popular: true
    },
    {
      name: 'WalletConnect',
      icon: 'assets/images/walletconnect.svg',
      description: 'Scan with WalletConnect to connect',
      popular: true
    },
    {
      name: 'Coinbase Wallet',
      icon: 'assets/images/coinbase.svg',
      description: 'Connect to your Coinbase wallet',
      popular: false
    },
    {
      name: 'Trust Wallet',
      icon: 'assets/images/trustwallet.svg',
      description: 'Connect to your Trust wallet',
      popular: false
    }
  ];

  connectingWallet: string | null = null;
  isConnected = false;
  connectionSuccess = false;
  connectionError = false;
  walletAddress: string = '';
  
  connectWallet(walletName: string) {
    
    this.connectingWallet = walletName;
    
    
    setTimeout(() => {

      const randomWalletAddress = '0x' + Array(40).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      const isSuccessful = Math.random() > 0.1;
      
      if (isSuccessful) {
        this.isConnected = true;
        this.connectionSuccess = true;
        this.walletAddress = randomWalletAddress;
        
        
        setTimeout(() => {
          this.connectionSuccess = false;
        }, 3000);
      } else {
        this.connectionError = true;
        this.connectingWallet = null;
        
        
        setTimeout(() => {
          this.connectionError = false;
        }, 3000);
      }
    }, 1500);
  }
  
  disconnectWallet() {
    
    this.connectingWallet = null;
    
    setTimeout(() => {
      this.isConnected = false;
      this.walletAddress = '';
    }, 500);
  }
  
  getFormattedAddress(): string {
    if (!this.walletAddress) return '';
    return this.walletAddress.substring(0, 6) + '...' + this.walletAddress.substring(this.walletAddress.length - 4);
  }
  
  copyToClipboard() {
    navigator.clipboard.writeText(this.walletAddress);
  }
}
