export interface IRegister<T> {
    register(address?: string): Promise<T>;

    registerRequestUrl?(address?: string): string;
}
