import { Options } from "./rangePresent";
import { viewData } from "./rangePresent";
import { Presenter } from "./rangePresent";

export class Model {
    private min:number;
    private max:number;
    private minRange:number;
    private maxRange:number;
    private val:number;
    private val2?:number;
    private width:number;

    constructor(){
        this.min = -1;
        this.max = 100;
        this.minRange = -1;
        this.maxRange = 100;
        this.val = 0;
        this.width = 0;
    }

    getModelVals():Options{
        return {
            minVal:this.min,
            maxVal:this.max
        }
    }

    setCustomModel(opt:Options){
        this.min = opt.minVal || this.min;
        this.max = opt.maxVal || this.max;
        this.minRange = opt.minVal || this.minRange;
        this.maxRange = opt.maxVal || this.maxRange;
    }

    setValues(opt:viewData, presenter){
        this.val = opt.clickValue;
        this.width = opt.baseValue;
        if(opt.clickValue2){
            this.val2 = opt.clickValue2;
        }
        this.count(presenter);

    }

    count(presenter:Presenter){
        let percent:number,
            value:number,
            range:number;


        percent = +(this.width / 100).toFixed(2);
        console.log(`Один процент ширины ${percent}`);
        value = Math.round(this.val / percent);
        console.log(`Значение отступа ползунка в процентах ${value}%`);
        range = (this.maxRange - this.minRange)/100;
        console.log(`Диапазон значений ${range}`);
        this.min = Math.round(range * value) + this.minRange;
        console.log(this.min);
        
                
    }

}