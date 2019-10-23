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

    constructor(){
        //Значения по умолчанию
        this.min = -1;
        this.max = 100;
        this.minRange = -1;
        this.maxRange = 100;
        this.val = 0;
        this.width = 0;
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
        this.max = opt.maxVal ? opt.maxVal : this.min;
        this.minRange = opt.minVal || this.minRange;
        this.maxRange = opt.maxVal || opt.minVal! + 100 || this.maxRange;//На случай неверного диапазона прибавляем к минимуму 100
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
        console.log(`Один процент ширины ${percent}`);
        value = +(val / percent).toFixed(2);
        console.log(`Значение отступа ползунка в процентах ${value}%`);
        range = +((rangeMax - rangeMin)/100).toFixed(2);
        console.log(`Диапазон значений ${range}`);
        eq = Math.round(range * value) + rangeMin;
        eq <= rangeMin ? eq = rangeMin : eq = eq;
        eq >= rangeMax ? eq = rangeMax : eq = eq;
        return eq
    }
}