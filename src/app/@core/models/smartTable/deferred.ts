export interface Deferred<T> {
    resolve: (data: T) => void;
    reject: () => void;
}