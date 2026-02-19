import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Custom render function that includes providers if needed
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  avatar: '/avatar.png',
  hasNewNotification: false,
  hasNewOrders: false,
  ...overrides,
});

export const createMockProvider = (overrides = {}) => ({
  id: '1',
  name: 'Test Provider',
  description: 'A test provider for testing purposes',
  rating: 4.5,
  image: '/provider.png',
  location: 'Brisbane, QLD',
  services: ['送餐服務'],
  ...overrides,
});

export const createMockCategory = (overrides = {}) => ({
  id: '1',
  name: 'Vegetarian',
  description: 'Vegetarian meal options',
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

// Mock functions
export const mockConsoleError = () => {
  const originalError = console.error;
  const mockError = jest.fn();
  
  beforeAll(() => {
    console.error = mockError;
  });
  
  afterAll(() => {
    console.error = originalError;
  });
  
  return mockError;
};

export const mockConsoleWarn = () => {
  const originalWarn = console.warn;
  const mockWarn = jest.fn();
  
  beforeAll(() => {
    console.warn = mockWarn;
  });
  
  afterAll(() => {
    console.warn = originalWarn;
  });
  
  return mockWarn;
};

// Async utilities
export const waitForElementToBeRemoved = (element: Element) => {
  return new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      if (!document.contains(element)) {
        observer.disconnect();
        resolve();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

// Form testing utilities
export const fillForm = async (formData: Record<string, string>) => {
  const user = (await import('@testing-library/user-event')).default.setup();
  
  for (const [name, value] of Object.entries(formData)) {
    const input = document.querySelector(`[name="${name}"]`) as HTMLInputElement;
    if (input) {
      await user.type(input, value);
    }
  }
  
  return user;
};


