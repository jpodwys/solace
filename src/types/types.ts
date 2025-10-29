export enum Degrees {
  MD = 'MD',
  PHD = 'PhD',
  MSW = 'MSW',
};

export type Advocate = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: Degrees;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
};
