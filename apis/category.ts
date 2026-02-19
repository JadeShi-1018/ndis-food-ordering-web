import axiosInstance from '@/libs/axiosInstance';
import {
  CategoryResponseDto,
  CategoryCreateDto,
  CategoryUpdateDto,
} from '@/types/category';

// getCategories
export async function getCategories(providerServiceId: string): Promise<CategoryResponseDto[]> {
  const res = await axiosInstance.get(`/ProviderService/${providerServiceId}/Categories`);
  return res.data;
}

// getCategoryById
export async function getCategoryById(providerServiceId: string, categoryId: string): Promise<CategoryResponseDto> {
  const res = await axiosInstance.get(`/ProviderService/${providerServiceId}/Categories/${categoryId}`);
  return res.data;
}

// createCategory
export async function createCategory(
  providerServiceId: string,
  dto: CategoryCreateDto
): Promise<CategoryResponseDto> {
  const res = await axiosInstance.post(`/ProviderService/${providerServiceId}/Categories`, dto);
  return res.data;
}

// updateCategory
export async function updateCategory(
  providerServiceId: string,
  categoryId: string,
  dto: CategoryUpdateDto
): Promise<CategoryResponseDto> {
  const res = await axiosInstance.put(`/ProviderService/${providerServiceId}/Categories/${categoryId}`, dto);
  return res.data;
}

// deleteCategory
export async function deleteCategory(providerServiceId: string, categoryId: string): Promise<void> {
  await axiosInstance.delete(`/ProviderService/${providerServiceId}/Categories/${categoryId}`);
}
