import {Model} from './rangeModel';
export interface Options{
    min :number;
    max:number;
    step?:number;
    range:boolean;
}
export class Presenter{
    public min:number;
    public max:number;
    public step:number;
    public range:boolean;

    constructor (options:Options, mod?:Model){
        this.min = options.min;
        this.max = options.max;
        this.step = options.step? options.step : 1;
        this.range = options.range ;
    }

    changeModel(mod:Model, opt:Options):void{
        mod.newOpt = {
            min: this.min,
            max: this.max,
            step: this.step,
            range: this.range
        }
    }
}