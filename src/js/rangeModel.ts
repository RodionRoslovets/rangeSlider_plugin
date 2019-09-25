export interface Options{
    min :number;
    max:number;
    step:number;
    range:boolean;
}

export class Model{
    public min:number;
    public max:number;
    public step:number;
    public range:boolean;

    constructor(options:Options = {min:0, max:100, step:1, range:false}){
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.range = options.range;
    }
}
