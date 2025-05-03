import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    icon: string;
    link: string;
  }[];
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface Partner {
  name: string;
  description: string;
  logo: string;
}

interface Value {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit {
  teamMembers: TeamMember[] = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Blockchain pioneer with 10+ years in fintech. Previously led blockchain innovation at Goldman Sachs.',
      image: 'assets/images/team/alex.jpg',
      socials: [
        { icon: 'link', link: 'https://linkedin.com' },
        { icon: 'language', link: 'https://alexjohnson.com' }
      ]
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'Former lead developer at Ethereum Foundation with expertise in smart contract security and DeFi protocols.',
      image: 'assets/images/team/sarah.jpg',
      socials: [
        { icon: 'link', link: 'https://linkedin.com' },
        { icon: 'language', link: 'https://sarahchen.dev' }
      ]
    },
    {
      name: 'Marcus Williams',
      role: 'Head of Real Estate',
      bio: 'Real estate veteran with over 15 years experience in commercial property investment and development.',
      image: 'assets/images/team/marcus.jpg',
      socials: [
        { icon: 'link', link: 'https://linkedin.com' }
      ]
    }
  ];

  milestones: Milestone[] = [
    {
      year: '2023',
      title: 'Investo Launch',
      description: 'Launched the Investo platform with initial focus on tokenized real estate investments.'
    },
    {
      year: '2023',
      title: 'Series A Funding',
      description: 'Secured $5M in Series A funding from leading blockchain venture capital firms.'
    },
    {
      year: '2024',
      title: 'Multi-Chain Expansion',
      description: 'Expanded platform capabilities to support investments across Ethereum, Solana, and Polygon networks.'
    },
    {
      year: '2024',
      title: 'Regulatory Approval',
      description: 'Obtained regulatory approval in key markets to offer compliant tokenized securities.'
    }
  ];

  partners: Partner[] = [
    {
      name: 'ChainSecure',
      description: 'Leading blockchain security auditing firm ensuring our smart contracts maintain the highest security standards.',
      logo: 'assets/images/partners/chain-secure.svg'
    },
    {
      name: 'GlobalProp',
      description: 'International real estate development firm providing premium property opportunities for tokenization.',
      logo: 'assets/images/partners/global-prop.svg'
    },
    {
      name: 'FinBlock',
      description: 'Financial technology provider specializing in connecting traditional finance rails with blockchain systems.',
      logo: 'assets/images/partners/finblock.svg'
    }
  ];

  values: Value[] = [
    {
      title: 'Transparency',
      description: 'We believe in complete transparency in all operations, using blockchain to provide verifiable proof of transactions and asset ownership.',
      icon: 'visibility'
    },
    {
      title: 'Security',
      description: 'Security is paramount in everything we do, from regular smart contract audits to robust infrastructure protection.',
      icon: 'security'
    },
    {
      title: 'Accessibility',
      description: 'Our mission is to make quality investments accessible to everyone, removing traditional barriers to entry.',
      icon: 'group'
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate at the intersection of blockchain and finance to deliver better investment solutions.',
      icon: 'lightbulb'
    }
  ];

  constructor() {}

  ngOnInit() {
    this.checkScrollAnimation();
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.checkScrollAnimation);
    
    setTimeout(() => {
      this.checkScrollAnimation();
    }, 100);
  }

  checkScrollAnimation = () => {
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in'
    );
    
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect();
      
      const isInViewport = 
        elementPosition.top < window.innerHeight - 100 && 
        elementPosition.bottom >= 0;
      
      if (isInViewport) {
        element.classList.add('animate');
      }
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
