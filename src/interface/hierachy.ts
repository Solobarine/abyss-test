export interface Service {
    name: String
}

export interface Category {
    name: String,
    children?: Category[] | Service[]
}

export type Hierachy = Category[] | []