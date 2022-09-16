export interface CountrySmall {
  cca3: string;
  name: Name;
}

export interface Name {
  common: string;
  nativeName: { [key: string]: NativeName };
  official: string;
}

export interface NativeName {
  common: string;
  official: string;
}
