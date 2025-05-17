import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.scss']
})
export class FeaturesSectionComponent {
  @Input() features: Feature[] = [
    {
      title: 'Smart Contract Investment',
      description: 'Automated, secure, and transparent investments powered by blockchain smart contracts',
      icon: 'description'
    },
    {
      title: 'Multi-Chain Support',
      description: 'Invest across multiple blockchains including Ethereum, Solana, Polygon, and more',
      icon: 'account_tree'
    },
    {
      title: 'Decentralized Security',
      description: 'Your assets are protected by state-of-the-art blockchain security and cryptography',
      icon: 'security'
    }
  ];
} 