export interface ProviderServiceDto {
  providerServiceId: string;
  providerServiceName: string;
  providerId: string;
  serviceTypeId: string;
  serviceTypeName: string;
  address: string;
  city: string;
  state: string;
  postcode: number;
  lat: number;
  long: number;
  categoryCount: number;
  itemCount: number;
}

export interface CategoryDto {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
}

export interface MenuItemDto {
  menuId: string;
  categoryId: string;
  menuName: string;
  periodName: string;
  price: number;
}

export interface ProviderServiceDetailDto {
  providerServiceId: string;
  providerServiceName: string;
  providerId: string;
  serviceTypeId: string;
  serviceTypeName: string;
  openingHours: string;
  address: string;
  city: string;
  state: string;
  postcode: number;
  lat: number;
  long: number;
  categories: CategoryDto[];
}
