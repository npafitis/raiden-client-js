export interface ILister<T> {
    list(address?: string): Promise<T[]>;

    listRequestUrl?(address?: string): string;
}
