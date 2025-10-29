export enum Degrees {
  MD = 'MD',
  PHD = 'PhD',
  MSW = 'MSW',
};

export type Advocate = {
  // Excluding id for now so we can re-use this type for the
  // default API payload since it doubles as the seed data.
  // id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: Degrees;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
};
