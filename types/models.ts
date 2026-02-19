export interface Provider {
    id: string;
    name: string;
    type: string;
    image: string;
    distance: string;
    serviceType: string[];
    address: string;
    phone: string;
    description: string;
    categories: string[];
}

export interface User {
    name: string
    avatar?: string
    hasNewNotification: boolean
    hasNewOrders: boolean
}