/* eslint-disable no-underscore-dangle */
export interface Coord {
    id: string;
    latitude: number;
    longitude: number;
    name: string;
};

export class MyCoords {
    private _id: string;
    private _rev: string;
    private _coords: Array<Coord>;

    constructor(newObj: boolean, obj?: any, data?: Coord) {
        this._id = 'my-coords';
        this._rev = obj?._rev || '';
        this._coords = [];
        if (newObj) { this._coords.push(data); }
        else {this._coords = obj?.coords;}
    }


    public addNewCoord(coord: Coord) {
        this._coords.push(coord);
    }

    public removeCoord(id: string) {
        this._coords = this._coords.filter((obj) => obj.id !== id);

    }

    public editCoord(coord: Coord, id) {
        console.log(this._coords);
        this.coords = this._coords.map((obj) => {
            if (obj.id === id) {
                obj.latitude = coord.latitude;
                obj.longitude = coord.longitude;
                obj.name = coord.name;
            }
            return obj;
        });
        console.log(this._coords);
    }

    public get data(): any {
        return {
            _id: this._id,
            _rev: this._rev,
            coords: this._coords
        };
    }

    public get coords(): Array<Coord> {
        return this._coords;
    }
    public set coords(value: Array<Coord>) {
        this._coords = value;
    }
}
