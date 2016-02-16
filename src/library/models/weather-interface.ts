export interface WeatherInterface {
    setUnits(units: string);

    getUnits(): string;

    setLocation(location: string);

    getLocation(): string ;

    getTemperature(): number;

    setTemperature(degrees: number);

    getLatitude(): number ;

    setLatitude(value: number);

    getLongitude(): number ;

    setLongitude(value: number) ;

    getSummary(): string ;

    setSummary(value: string) ;

    getImageName(): string ;

    setImageName(value: string);

    getImage(): string ;

    setImage(value: string);
}
