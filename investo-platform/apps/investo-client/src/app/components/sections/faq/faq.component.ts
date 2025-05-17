import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqs: FAQItem[] = [
    {
      question: 'What is Investo and how does it work?',
      answer: 'Investo is a blockchain-powered platform that allows users to invest in tokenized real estate and other assets. It uses smart contracts to automate investment processes, providing transparency and security.',
      isOpen: false
    },
    {
      question: 'What are the benefits of using blockchain for investments?',
      answer: 'Blockchain technology offers enhanced security, transparency, and efficiency. It allows for fractional ownership, reduces intermediaries, and provides an immutable record of transactions.',
      isOpen: false
    },
    {
      question: 'What is the minimum investment amount?',
      answer: 'The minimum investment amount varies by property or asset but typically starts at $100 USD for fractional shares, making it accessible to a wider range of investors.',
      isOpen: false
    },
    {
      question: 'How are properties tokenized on the platform?',
      answer: 'Properties are legally vetted and then represented as digital tokens on the blockchain. Each token corresponds to a share of the property, allowing for easy trading and fractional ownership.',
      isOpen: false
    },
    {
      question: 'Is my investment secure?',
      answer: 'Yes, Investo employs state-of-the-art security measures, including multi-signature wallets, smart contract audits, and adherence to best practices in cybersecurity to protect your assets.',
      isOpen: false
    },
    {
      question: 'Can I track my investments in real-time?',
      answer: 'Absolutely! Our platform provides a comprehensive dashboard where you can monitor your portfolio performance, view transaction history, and receive updates on your investments 24/7.',
      isOpen: false
    },
    {
      question: 'Can I invest from abroad?',
      answer: 'Yes, Investo is a global platform that accepts investors from most countries. Our blockchain-based system enables international transactions with proper KYC/AML compliance procedures in place to ensure regulatory compliance in your jurisdiction.',
      isOpen: false
    },
    {
      question: 'Do I need to use cryptocurrency?',
      answer: 'No, cryptocurrency is not required. Investo accepts both traditional fiat currency (USD, EUR, etc.) and various cryptocurrencies. You can choose the payment method that works best for you, and we handle the conversion to tokens behind the scenes.',
      isOpen: false
    },
    {
      question: 'What happens if a project fails?',
      answer: 'In the unlikely event of a project failure, Investo has protective measures in place. Each investment is backed by the underlying asset, and our smart contracts include contingency protocols. Investors are protected by legal agreements and insurance policies specific to each offering.',
      isOpen: false
    },
    {
      question: 'How are construction milestones verified?',
      answer: 'Construction milestones are verified through a combination of methods: on-site inspections by certified professionals, photographic and video evidence uploaded to the blockchain, and IoT sensors where applicable. All verification data is stored on the blockchain for transparency and immutability.',
      isOpen: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  toggleFaq(item: FAQItem) {
    item.isOpen = !item.isOpen;
  }

}
