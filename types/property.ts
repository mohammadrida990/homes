import { PropertyStatus } from "./propertyStatus";

export type Property = {
  id: string;
  address1: string;
  address2?: string;
  city: string;
  description: string;
  postcode: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: PropertyStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images?: any[];
};
