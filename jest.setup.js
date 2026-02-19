import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return "/";
  },
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock Google Maps
global.google = {
  maps: {
    Map: jest.fn(),
    Marker: jest.fn(),
    Geocoder: jest.fn(),
  },
};

// Mock environment variables
process.env.NEXT_PUBLIC_GOOGLE_MAPS_API = "test-api-key";
process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:3000/api";


