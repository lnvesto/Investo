import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RealEstate } from '../models/real-estate.model';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {
  private realEstateList: RealEstate[] = [
    {
      id: 1,
      publisher_id: 101,
      title: 'Modern Residential Complex',
      description: 'A premium residential complex located in a prestigious area of the city. The complex consists of multiple apartment buildings with various amenities including swimming pools, fitness centers, and landscaped gardens. This investment opportunity offers a stable return through long-term rental income and property value appreciation in one of the most dynamically developing areas.',
      publishDate: new Date('2024-06-01'),
      price: 25000000,
      minInvestment: 1000,
      maxInvestment: 1000000,
      expectedRoi: 14.5,
      location: 'Kyiv, Ukraine',
      category: 'Residential',
      area: 5000,
      roi: 14.5,
      yearlyIncome: 3625000,
      tokenPrice: 100,
      tokensAvailable: 150000,
      totalTokens: 250000,
      fundingGoal: 25000000,
      currentFunding: 10000000,
      investorCount: 127,
      features: ['Premium location', 'Swimming pool', 'Fitness center', 'Security', 'Parking', 'Green areas', '24/7 Concierge', 'Smart home systems'],
      images: [
        {
          id: 1,
          real_estate_id: 1,
          image_url: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
        },
        {
          id: 2,
          real_estate_id: 1,
          image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
        },
        {
          id: 3,
          real_estate_id: 1,
          image_url: 'https://images.unsplash.com/photo-1556156653-e5a7c69cc263?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'
        },
        {
          id: 4,
          real_estate_id: 1,
          image_url: 'https://images.unsplash.com/photo-1519255122284-c3acd66be602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2836&q=80'
        }
      ],
      buildingStatus: {
        status: 'Under Construction',
        completionDate: new Date('2025-05-15'),
        completionPercentage: 65,
        stages: [
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: true
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: true
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: true
          },
          {
            name: 'Roof Installation',
            description: 'Installation of roof structure and covering',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 2,
      publisher_id: 102,
      title: 'Luxury Waterfront Villa',
      description: 'Stunning waterfront property with panoramic ocean views and private beach access. This luxurious villa offers an exceptional investment opportunity in one of the most sought-after locations. The property features high-end finishes, spacious living areas, and state-of-the-art amenities.',
      publishDate: new Date('2025-03-15'),
      price: 12500000,
      minInvestment: 5000,
      maxInvestment: 2000000,
      expectedRoi: 12.8,
      location: 'Lviv, Ukraine',
      category: 'Luxury Villa',
      area: 850,
      roi: 12.8,
      yearlyIncome: 1600000,
      tokenPrice: 500,
      tokensAvailable: 15000,
      totalTokens: 25000,
      fundingGoal: 12500000,
      currentFunding: 7500000,
      investorCount: 86,
      features: ['Waterfront', 'Private beach', 'Infinity pool', 'Smart home', 'Home theater', 'Wine cellar', 'Gourmet kitchen', '5 bedrooms'],
      images: [
        {
          id: 5,
          real_estate_id: 2,
          image_url: 'https://image-proxy.binaryx.com/@media/_big%2FoffPlan%2F2025-1%2Fv-3_h-0x9a61c2957362416f001b1c9923ac16bb464ca23e5efd7bb0811e605ecc0270bb_n-Group_1000011134_min.jpg'
        },
        {
          id: 6,
          real_estate_id: 2,
          image_url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
        }
      ],
      buildingStatus: {
        status: 'Completed',
        completionDate: new Date('2025-01-10'),
        completionPercentage: 100,
        stages: [
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: true
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: true
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: true
          },
          {
            name: 'Roof Installation',
            description: 'Installation of roof structure and covering',
            completed: true
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: true
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: true
          }
        ]
      }
    },
    {
      id: 3,
      publisher_id: 103,
      title: 'Modern City Apartments',
      description: 'Contemporary apartments in the heart of downtown with premium amenities and stunning skyline views. This development offers a mix of studio, one-bedroom, and two-bedroom units, all featuring modern design, energy-efficient appliances, and smart home technology.',
      publishDate: new Date('2025-02-28'),
      price: 45000000,
      minInvestment: 2000,
      maxInvestment: 500000,
      expectedRoi: 10.5,
      location: 'Chernivtsi, Ukraine',
      category: 'Apartment',
      area: 12000,
      roi: 10.5,
      yearlyIncome: 4725000,
      tokenPrice: 200,
      tokensAvailable: 125000,
      totalTokens: 225000,
      fundingGoal: 45000000,
      currentFunding: 25000000,
      investorCount: 203,
      features: ['Central location', 'Gym', 'Rooftop garden', 'Co-working space', 'Package delivery', 'Smart home tech', 'Bike storage', 'Electric car charging'],
      images: [
        {
          id: 7,
          real_estate_id: 3,
          image_url: 'https://lpnu.ua/sites/default/files/2024/12/17/news/29585/gurt-3-t.jpg'
        },
        {
          id: 8,
          real_estate_id: 3,
          image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2835&q=80'
        }
      ],
      buildingStatus: {
        status: 'Under Construction',
        completionDate: new Date('2026-08-30'),
        completionPercentage: 45,
        stages: [
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: true
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: true
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Roof Installation',
            description: 'Installation of roof structure and covering',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 4,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      location: 'Dnipro, Ukraine',
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      features: ['Prime location', 'Flexible spaces', 'Conference rooms', 'High-speed internet', 'Security', 'Parking', 'LEED certification', 'Transportation access'],
      images: [
        {
          id: 9,
          real_estate_id: 4,
          image_url: 'https://images.pexels.com/photos/31724905/pexels-photo-31724905/free-photo-of-the-pearl-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 10,
          real_estate_id: 4,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 5,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Lviv, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 11,
          real_estate_id: 5,
          image_url: 'https://images.pexels.com/photos/31800508/pexels-photo-31800508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 12,
          real_estate_id: 5,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 6,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Odesa, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 13,
          real_estate_id: 6,
          image_url: 'https://images.pexels.com/photos/31751025/pexels-photo-31751025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 14,
          real_estate_id: 6,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 7,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Kharkiv, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 15,
          real_estate_id: 7,
          image_url: 'https://images.pexels.com/photos/31792563/pexels-photo-31792563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 16,
          real_estate_id: 7,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 8,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Dripro, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 17,
          real_estate_id: 8,
          image_url: 'https://images.pexels.com/photos/31776020/pexels-photo-31776020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 18,
          real_estate_id: 8,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 9,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Vinnytsia, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 19,
          real_estate_id: 9,
          image_url: 'https://images.pexels.com/photos/13150153/pexels-photo-13150153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 20,
          real_estate_id: 9,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 10,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Ternopil, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 21,
          real_estate_id: 10,
          image_url: 'https://media.istockphoto.com/id/486644087/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B6%D0%B8%D1%82%D0%BB%D0%BE%D0%B2%D0%B8%D0%B9-%D0%B1%D1%83%D0%B4%D0%B8%D0%BD%D0%BE%D0%BA.jpg?s=612x612&w=0&k=20&c=DxMSttJFVzJKtt02wHnDnnSySPlrUO6XJPRK-DLepTQ='
        },
        {
          id: 22,
          real_estate_id: 10,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 11,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Ivano-Frankivsk, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 23,
          real_estate_id: 11,
          image_url: 'https://img.freepik.com/free-photo/analog-landscape-city-with-buildings_23-2149661456.jpg?semt=ais_hybrid&w=740'
        },
        {
          id: 24,
          real_estate_id: 11,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 12,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Chernivtsi, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 25,
          real_estate_id: 12,
          image_url: 'https://images.prismic.io/danica/90afd7ed-0050-4e95-a58e-8207e0f50f7d_5.jpg?auto=compress,format&rect=0,0,1920,1080&w=1920&h=1080'
        },
        {
          id: 26,
          real_estate_id: 12,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 13,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Zhytomyr, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 27,
          real_estate_id: 13,
          image_url: 'https://images.pexels.com/photos/31800508/pexels-photo-31800508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 28,
          real_estate_id: 13,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 14,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Cherkasy, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 29,
          real_estate_id: 14,
          image_url: 'https://images.pexels.com/photos/31724905/pexels-photo-31724905/free-photo-of-the-pearl-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 30,
          real_estate_id: 14,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 15,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Poltava, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 31,
          real_estate_id: 15,
          image_url: 'https://images.pexels.com/photos/31792563/pexels-photo-31792563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 32,
          real_estate_id: 15,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 16,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Sumy, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 33,
          real_estate_id: 16,
          image_url: 'https://images.pexels.com/photos/13150153/pexels-photo-13150153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 34,
          real_estate_id: 16,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 17,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Uzhhorod, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 35,
          real_estate_id: 17,
          image_url: 'https://images.pexels.com/photos/31724905/pexels-photo-31724905/free-photo-of-the-pearl-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 36,
          real_estate_id: 17,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 18,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Lutsk, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 37,
          real_estate_id: 18,
          image_url: 'https://images.pexels.com/photos/31792563/pexels-photo-31792563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 38,
          real_estate_id: 18,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 19,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Rivne, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 39,
          real_estate_id: 19,
          image_url: 'https://images.pexels.com/photos/31724905/pexels-photo-31724905/free-photo-of-the-pearl-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 40,
          real_estate_id: 19,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 20,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Kropyvnytskyi, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 41,
          real_estate_id: 20,
          image_url: 'https://images.pexels.com/photos/31800508/pexels-photo-31800508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 42,
          real_estate_id: 20,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 21,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Mykolaiv, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 43,
          real_estate_id: 21,
          image_url: 'https://images.pexels.com/photos/31792563/pexels-photo-31792563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 44,
          real_estate_id: 21,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 22,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Khmelnytskyi, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 45,
          real_estate_id: 22,
          image_url: 'https://images.pexels.com/photos/13150153/pexels-photo-13150153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 46,
          real_estate_id: 22,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    },
    {
      id: 23,
      publisher_id: 104,
      title: 'Commercial Office Space',
      description: 'Prime commercial office space in a prestigious business district with modern infrastructure. This property offers high-quality office spaces suitable for corporate headquarters, startups, and professional services. The building features state-of-the-art technology, flexible floor plans, and sustainable design elements.',
      publishDate: new Date('2025-04-05'),
      price: 89000000,
      minInvestment: 10000,
      maxInvestment: 5000000,
      expectedRoi: 9.2,
      category: 'Commercial',
      area: 35000,
      roi: 9.2,
      yearlyIncome: 8188000,
      tokenPrice: 1000,
      tokensAvailable: 44500,
      totalTokens: 89000,
      fundingGoal: 89000000,
      currentFunding: 44500000,
      investorCount: 78,
      location: 'Zaporizhia, Ukraine',
      features: [
        'Prime location',
        'Flexible spaces',
        'Conference rooms',
        'High-speed internet',
        'Security',
        'Parking',
        'LEED certification',
        'Transportation access'
      ],
      images: [
        {
          id: 47,
          real_estate_id: 23,
          image_url: 'https://img.freepik.com/free-photo/analog-landscape-city-with-buildings_23-2149661456.jpg?semt=ais_hybrid&w=740'
        },
        {
          id: 48,
          real_estate_id: 23,
          image_url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2901&q=80'
        }
      ],
      buildingStatus: {
        status: 'Planning',
        completionDate: new Date('2027-03-15'),
        completionPercentage: 10,
        stages: [
          {
            name: 'Planning & Approval',
            description: 'Obtaining necessary permits and approvals',
            completed: true
          },
          {
            name: 'Foundation',
            description: 'Laying the foundation and underground structures',
            completed: false
          },
          {
            name: 'Structural Framework',
            description: 'Construction of the main building structure and frame',
            completed: false
          },
          {
            name: 'External Walls',
            description: 'Building external walls and façade',
            completed: false
          },
          {
            name: 'Interior Work',
            description: 'Interior finishes, installations and fittings',
            completed: false
          },
          {
            name: 'Final Touches',
            description: 'Landscaping and final property preparations',
            completed: false
          }
        ]
      }
    }
  ];

  constructor() {}

  getAllRealEstate(): Observable<RealEstate[]> {
    return of(this.realEstateList);
  }

  getFeaturedRealEstate(count: number = 3): Observable<RealEstate[]> {
    return of(this.realEstateList.slice(0, count));
  }

  getRealEstateById(id: number): Observable<RealEstate | undefined> {
    return of(this.realEstateList.find(item => item.id === id));
  }
}