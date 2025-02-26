export interface List {
    id: string;
    userId: number;
    name: string;
    favorite: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Item {
    id: string;
    listId: string;
    name: string;
    quantity: number;
    price: number;
    weight: number;
    checked: boolean;
    createdAt: Date;
}
