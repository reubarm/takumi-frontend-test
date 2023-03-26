type Brand = {
  id: string;
  name: string;
  logo: string;
};

type Campaign = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  brandId: string;
  influencers: Influencer[];
};

type Influencer = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  birthdate: string;
  country: string;
};
