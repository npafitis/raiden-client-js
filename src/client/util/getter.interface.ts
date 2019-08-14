export interface IGetter<T> {
    get(address?: string): Promise<T>;

    getRequestUrl?(address?: string): string;
}
