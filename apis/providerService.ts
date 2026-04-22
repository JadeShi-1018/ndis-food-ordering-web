import axiosServiceInstance from '@/libs/axiosServiceInstance';
import { ProviderServiceDto, ProviderServiceDetailDto, MenuItemDto } from '@/types/providerService';

export async function getProviderServices(): Promise<ProviderServiceDto[]> {
  const res = await axiosServiceInstance.get('/ProviderService');
  return res.data;
}

export async function getProviderServiceById(id: string): Promise<ProviderServiceDetailDto> {
  const res = await axiosServiceInstance.get(`/ProviderService/${id}`);
  return res.data;
}

export async function getCategoryMenu(
  providerServiceId: string,
  categoryId: string
): Promise<MenuItemDto[]> {
  const res = await axiosServiceInstance.get(
    `/ProviderService/${providerServiceId}/Categories/${categoryId}/Menu`
  );
  return res.data;
}
