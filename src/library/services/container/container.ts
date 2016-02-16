export class Container {

    private container: {[key: string]: Object} = {};

    public setService(key: string, object: Object) {
        if (key != null && this.container[key] == null) {
            this.container[key] = object;
        }
    }

    public getService(key: string): any {
        return this.container[key];
    }
}
