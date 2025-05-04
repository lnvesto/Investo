import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileUtilsService {
  constructor() { }

  /**
   * Format a date to a human-readable string
   */
  formatDate(date?: Date): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Format a currency value
   */
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  }

  /**
   * Truncate a blockchain address for display
   */
  truncateAddress(address?: string): string {
    if (!address) return 'N/A';
    if (address.length <= 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  /**
   * Get CSS class for transaction status
   */
  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
      case 'completed':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'failed':
      case 'cancelled':
        return 'status-failed';
      default:
        return '';
    }
  }

  /**
   * Get CSS class for transaction type
   */
  getTransactionClass(type: string): string {
    switch (type) {
      case 'deposit':
        return 'transaction-deposit';
      case 'withdrawal':
        return 'transaction-withdrawal';
      case 'investment':
        return 'transaction-investment';
      case 'return':
        return 'transaction-return';
      case 'reward':
        return 'transaction-reward';
      default:
        return 'transaction-default';
    }
  }

  /**
   * Get icon for transaction type
   */
  getTransactionIcon(type: string): string {
    switch (type) {
      case 'deposit':
        return 'arrow_downward';
      case 'withdrawal':
        return 'arrow_upward';
      case 'investment':
        return 'account_balance';
      case 'return':
        return 'savings';
      case 'reward':
        return 'card_giftcard';
      default:
        return 'swap_horiz';
    }
  }

  /**
   * Copy text to clipboard
   */
  copyToClipboard(text?: string): void {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Text copied to clipboard');
        // Could show a toast notification here
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }
}