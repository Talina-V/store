export interface Product {
    id: number;
    amount: number;
    name: string;
}

export interface Store {
    id?: number;
    name: string;
    products: Product[];
}


