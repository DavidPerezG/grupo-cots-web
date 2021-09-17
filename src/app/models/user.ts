export interface User {
    _id?: string,
    name: string,
    email: string,
    password: string,
    roles?: any,
    createdAt?: string,
    updatedAt?: string
}

export interface UserUpdate {
    _id?: string,
    name: string,
    email: string,
    password?: string,
    roles?: any,
    createdAt?: string,
    updatedAt?: string   
}