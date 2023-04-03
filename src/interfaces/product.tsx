export interface Product {
    id: string;
    object: "product";
    active: boolean;
    attributes: string[] | null;
    created: number;
    default_price: {
        id: string;
        object: "price";
        active: boolean;
        billing_scheme: string;
        created: number;
        currency: string;
        product: string;
        unit_amount: number | null;
        unit_amount_decimal: string | null;
    };
    description: string | null;
    images: string[];
    metadata: {
        category: string;
        manufacturer: string;
        [key: string]: any;
    };
    name: "Coat";
    unit_label?: string | null;
    updated: number;
    url: string | null;
    payment_link: string | null;
}
