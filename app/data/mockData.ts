import { Provider } from "../types/models";

export const providerData: Provider = {
  id: "1",
  name: "Provider's Name",
  type: "Chinese restaurant",
  image: "",
  distance: "150 m",
  serviceType: ["中式料理", "南洋料理"],
  address: "Herring Road 8, Waterloo Rd, Macquarie Park NSW",
  phone: "0400 000 000",
  description:
    "我們是 NDIS 認證送餐提供者，提供健康美味的餐點，包括正宗中國菜，滿足您的個人需求。無論特殊飲食或日常餐點，我們確保安全、準時送達，讓您輕鬆享受營養均衡的美食。",
  categories: ["葷食", "素食"],
};

export const providerList: Provider[] = [
  { ...providerData, id: "1", image: "" },
  {
    ...providerData,
    id: "2",
    name: "Golden Dragon Restaurant",
    categories: ["葷食", "素食"],
    serviceType: ["粵菜"],
    image: "/provider.png",
  },
  {
    ...providerData,
    id: "3",
    name: "Spice Garden",
    categories: ["葷食"],
    serviceType: ["南洋料理"],
    image: "",
  }, // No image - will use default
  {
    ...providerData,
    id: "4",
    name: "Vegetarian Delight",
    categories: ["素食"],
    serviceType: ["素食料理"],
    image: "/provider.png",
  },
  {
    ...providerData,
    id: "5",
    name: "Ocean Fresh",
    categories: ["葷食"],
    serviceType: ["海鮮料理"],
    image: "",
  },
  {
    ...providerData,
    id: "6",
    name: "Noodle House",
    categories: ["葷食", "素食"],
    serviceType: ["麵食"],
    image: "/provider.png",
  },
  {
    ...providerData,
    id: "7",
    name: "Tea Garden Café",
    categories: ["素食"],
    serviceType: ["茶餐廳"],
    image: "",
  },
  {
    ...providerData,
    id: "8",
    name: "BBQ Master",
    categories: ["葷食"],
    serviceType: ["燒烤"],
    image: "",
  },
];
