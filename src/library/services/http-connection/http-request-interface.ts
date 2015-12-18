export interface HttpRequestInterface {
    get(url: string): Promise<any>;
}
