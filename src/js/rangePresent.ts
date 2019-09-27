import {Model} from './rangeModel';
import {View} from './rangeView';

export interface Options{
    min :number;
    max:number;
    step?:number;
    range:boolean;
}
export interface viewOpt{
    background:string;
    width:number;
    height:number;
    p?:number;
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

    changeModel(mod:Model):void{
        mod.newOpt = {
            min: this.min,
            max: this.max,
            step: this.step,
            range: this.range
        }
        mod.count(mod.newOpt);
    }

    click(mod:Model,view:View):any{
        mod.aModif();
        console.log(mod);
        view.newOpt.p = mod.a;
        view.changeView();
    }

    changeView(view:View,vOpt:viewOpt,mod:Model):void{
        view.newOpt.background = vOpt.background;
        view.newOpt.width = vOpt.width;
        view.newOpt.height = vOpt.height;
        view.newOpt.p = mod.getRes();
    }
}