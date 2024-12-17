import { User } from '@modules/user/user.entity';

export interface IAddress {
  id: number;
  name: string; // Adresin adı (örneğin, "Home", "Work" gibi)
  country: string; // Ülke
  region: string; // Bölge (örneğin, eyalet veya il)
  city: string; // Şehir
  postalCode: string; // Posta kodu
  addressLine1: string; // Adres satırı 1
  addressLine2?: string; // Adres satırı 2 (Opsiyonel)
}
