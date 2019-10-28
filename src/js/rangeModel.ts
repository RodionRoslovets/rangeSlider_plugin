import { Options } from "./rangePresent";
import { viewData } from "./rangePresent";

export class Model {
    private min:number;
    private max:number;
    private minRange:number;
    private maxRange:number;
    private val:number;
    private val2?:number;
    private width:number;
    private step:number;

    constructor(){
        //Значения по умолчанию
        this.min = 0;
        this.max = 100;
        this.minRange = 0;
        this.maxRange = 100;
        this.val = 0;
        this.width = 0;
        this.step = 1;
    }

    //Получить значения из модели
    getModelVals():Options{
        return {
            minVal:this.min,
            maxVal:this.max
        }
    }

    //Установить значения модели извне
    setCustomModel(opt:Options):void{
            this.min = opt.minVal ? opt.minVal : this.min;
            this.max = opt.maxVal ? opt.maxVal : this.max;
            this.minRange = opt.minVal ? opt.minVal : this.min;
            this.maxRange = opt.maxVal ? opt.maxVal : this.max;
            this.step = opt.step ? opt.step : this.step;
            this.min = opt.from ? opt.from : this.min;
    }

    //Установить значения, полученые при движении ползунка
    setValues(opt:viewData):void{
        this.val = opt.clickValue;
        this.width = opt.baseValue;
        if(opt.clickValue2){
            this.val2 = opt.clickValue2;
        }
        this.countRangeValues();

    }

    //Посчитать значения из данных ползунка в зависимости от условий
    countRangeValues():void{
        this.min = this.count(this.width, this.val, this.minRange, this.maxRange);
        
        if(this.val2){
            this.max = this.count(this.width, this.val2, this.minRange, this.maxRange);
        }               
    }

    //Функция подсчета
    count(width:number, val:number, rangeMin:number, rangeMax:number):number{
        let percent:number,
            value:number,
            range:number,
            eq:number;

        percent = +(width / 100).toFixed(2);
        value = +(val / percent).toFixed(2);
        range = +((rangeMax - rangeMin)/100).toFixed(2);
        eq = +((range * value) + rangeMin).toFixed(2);

        eq < rangeMin ? eq = rangeMin : eq = eq;
        eq >= rangeMax ? eq = rangeMax : eq = eq;
        //Проверка на шаг
        
            if(eq % this.step  > this.step /2){
                eq += this.step - (eq % this.step);
            }
            else{
                eq -= eq % this.step;
            }
       

        return eq
    }
}