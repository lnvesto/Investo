export interface RealEstateImage {
  id: number;
  real_estate_id: number;
  image_url: string;
}

export interface RealEstate {
  id: number;
  publisher_id: number;
  title: string;
  description: string;
  publishDate: Date;
  price: number;
  location: string;
  category: string;
  area: number;
  roi: number;
  yearlyIncome: number;
  tokenPrice: number;
  tokensAvailable: number;
  totalTokens: number;
  fundingGoal: number;
  currentFunding: number;
  investorCount: number;
  features: string[];
  images: RealEstateImage[];
  buildingStatus?: {
    status: string;
    completionDate: Date;
    completionPercentage: number;
    stages: {
      name: string;
      description: string;
      completed: boolean;
    }[];
  };
  minInvestment?: number;
  maxInvestment?: number;
  expectedRoi?: number;
  listed?: string; // Date when the property was listed
}