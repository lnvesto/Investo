import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-connect-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './connect-wallet.component.html',
  styleUrl: './connect-wallet.component.scss'
})
export class ConnectWalletComponent {
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
    // In a real app, this would integrate with actual wallet providers
    this.connectingWallet = walletName;
    
    // Simulate connection process with timeout
    setTimeout(() => {
      // Generate a random wallet address for demo purposes
      const randomWalletAddress = '0x' + Array(40).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      // 90% success rate for demo
      const isSuccessful = Math.random() > 0.1;
      
      if (isSuccessful) {
        this.isConnected = true;
        this.connectionSuccess = true;
        this.walletAddress = randomWalletAddress;
        
        // Hide success message after a delay
        setTimeout(() => {
          this.connectionSuccess = false;
        }, 3000);
      } else {
        this.connectionError = true;
        this.connectingWallet = null;
        
        // Hide error message after a delay
        setTimeout(() => {
          this.connectionError = false;
        }, 3000);
      }
    }, 1500);
  }
  
  disconnectWallet() {
    // Simulate disconnection with timeout
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
    // In a real app, you would show a copy success message
  }
}
