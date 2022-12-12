import { Address } from './address.interface';
import { DriverLicense } from "./driverLicense.interface";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  type: string;
  phone: string;
  driverLicense: DriverLicense;
  address: Address;
  DOB: string;
  userType: string;
  token?: string;
}