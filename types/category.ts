export interface CategoryResponseDto {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  providerServiceId: string;
}

export interface CategoryCreateDto {
  categoryName: string;
  categoryDescription?: string;
}

export interface CategoryUpdateDto {
  categoryName: string;
  categoryDescription?: string;
}
