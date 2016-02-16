import {WeatherInterface} from "./weather-interface";

export class Weather implements WeatherInterface {
    private latitude: number;

    private longitude: number;

    private summary: string;

    private imageName: string;

    private image: string;

    private temperature: number;

    private location: string;

    private units: string;

    public setUnits(units: string) {
        this.units = units;
    }

    public getUnits(): string {
        return this.units;
    }

    public setLocation(location: string) {
        this.location = location;
    }

    public getLocation(): string {
        return this.location;
    }

    public getTemperature(): number {
        return this.temperature;
    }

    public setTemperature(degrees: number) {
        this.temperature = degrees;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public setLatitude(value: number) {
        this.latitude = value;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public setLongitude(value: number) {
        this.longitude = value;
    }

    public getSummary(): string {
        return this.summary;
    }

    public setSummary(value: string) {
        this.summary = value;
    }

    public getImageName(): string {
        return this.imageName;
    }

    public setImageName(value: string) {
        this.imageName = value;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(value: string) {
        this.image = value;
    }
}
