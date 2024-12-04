export namespace main {
	
	export class Coordinate {
	    X: number;
	    Y: number;
	
	    static createFrom(source: any = {}) {
	        return new Coordinate(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.X = source["X"];
	        this.Y = source["Y"];
	    }
	}
	export class MapData {
	    Name: string;
	    RemainingTime: number;
	    Size: number[];
	    Data: number[][];
	    C: Coordinate;
	    H: Coordinate;
	
	    static createFrom(source: any = {}) {
	        return new MapData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.RemainingTime = source["RemainingTime"];
	        this.Size = source["Size"];
	        this.Data = source["Data"];
	        this.C = this.convertValues(source["C"], Coordinate);
	        this.H = this.convertValues(source["H"], Coordinate);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

