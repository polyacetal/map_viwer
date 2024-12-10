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
	export class Size {
	    Rows: number;
	    Cols: number;
	
	    static createFrom(source: any = {}) {
	        return new Size(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Rows = source["Rows"];
	        this.Cols = source["Cols"];
	    }
	}
	export class MapData {
	    Name: string;
	    Time: number;
	    Size: Size;
	    Data: number[][];
	    Cool: Coordinate;
	    Hot: Coordinate;
	
	    static createFrom(source: any = {}) {
	        return new MapData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Time = source["Time"];
	        this.Size = this.convertValues(source["Size"], Size);
	        this.Data = source["Data"];
	        this.Cool = this.convertValues(source["Cool"], Coordinate);
	        this.Hot = this.convertValues(source["Hot"], Coordinate);
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

