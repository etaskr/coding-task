/// <reference path="./../../../../typings/tsd.d.ts" />
import {CoderInterface} from "./coder-interface";

export class BinaryCoderWrapper implements CoderInterface {

    public encode(data: string): string {
        return "";
    }

    public decode(data: string): any {
        let buffer = new Buffer(data, "utf8");
        return buffer.toString();
    }

}
