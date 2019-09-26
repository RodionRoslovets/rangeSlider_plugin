import {Options} from './rangePresent';
export class Model{
    private min:number = 0;
    private max:number = 100;
    private step:number = 1;
    private range:boolean = false;
    public newOpt:any;

    // constructor(options:Options = {min:0, max:100, step:1, range:false}){
    //     this.min = options.min;
    //     this.max = options.max;
    //     this.step = options.step;
    //     this.range = options.range;
    // }

    getProps():Options{
        return{
            min: this.min,
            max: this.max,
            step: this.step,
            range: this.range
        }
    }
    setProps(newOpt:Options){
        this.min = newOpt.min
        this.max = newOpt.max
        this.step = newOpt.step? newOpt.step : this.step
        this.range = newOpt.range 
    }
}
