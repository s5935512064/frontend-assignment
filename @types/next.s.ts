export {}; // This is here to prevent `PageProps` at the bottom from being exposed

declare global {
  interface Address {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  }
  interface User {
    id: number;
    address: Address;
    age: number;
    bank: {
      cardExpire: string;
      cardNumber: string;
      cardType: string;
      currency: string;
      iban: string;
    };
    birthDate: string;
    bloodGroup: string;
    company: {
      address: Address;
      department: string;
      name: string;
      title: string;
    };
    domain: string;
    ein: string;
    email: string;
    eyeColor: string;
    firstName: string;
    gender: string;
    hair: {
      color: string;
      type: string;
    };
    height: number;
    weight: number;
    image: string;
    ip: string;
    lastName: string;
    macAddress: string;
    maidenName: string;
    password: string;
    phone: string;
    ssn: string;
    university: string;
    userAgent: string;
    username: string;
  }

  interface Users extends Array<User> {}
}
