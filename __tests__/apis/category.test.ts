import { getCategories } from '../../apis/category';
import axiosInstance from '../../libs/axiosInstance';

// Mock the axios instance
jest.mock('../../libs/axiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('Category API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    const mockProviderServiceId = '25b862f0-0cb7-44c0-8f1c-10c663e938b2';
    
    const mockCategories = [
      {
        id: '1',
        name: 'Vegetarian',
        description: 'Vegetarian meal options',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Gluten-Free',
        description: 'Gluten-free meal options',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ];

    it('successfully fetches categories', async () => {
      // Mock successful response
      mockedAxios.get.mockResolvedValueOnce({
        data: mockCategories,
        succeed: true
      });

      const result = await getCategories(mockProviderServiceId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `/ProviderService/${mockProviderServiceId}/categories`
      );
      expect(result).toEqual(mockCategories);
    });

    it('handles API error responses', async () => {
      // Mock error response
      const errorMessage = 'Failed to fetch categories';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getCategories(mockProviderServiceId)).rejects.toThrow(errorMessage);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `/ProviderService/${mockProviderServiceId}/categories`
      );
    });

    it('handles empty response', async () => {
      // Mock empty response
      mockedAxios.get.mockResolvedValueOnce({
        data: [],
        succeed: true
      });

      const result = await getCategories(mockProviderServiceId);

      expect(result).toEqual([]);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `/ProviderService/${mockProviderServiceId}/categories`
      );
    });

    it('handles malformed response data', async () => {
      // Mock malformed response
      mockedAxios.get.mockResolvedValueOnce({
        data: null,
        succeed: true
      });

      const result = await getCategories(mockProviderServiceId);

      expect(result).toBeNull();
    });

    it('validates provider service ID parameter', async () => {
      const invalidId = '';
      
      await expect(getCategories(invalidId)).rejects.toThrow();
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });
  });
});


