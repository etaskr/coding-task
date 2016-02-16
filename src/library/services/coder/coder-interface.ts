export interface CoderInterface {
    encode(data: string): string;

    decode(data: string): string;
}
