import {View} from './rangeView';
import {Model} from './rangeModel';

export interface Options {
    range?:boolean;
    vertical?:boolean;
    minVal?:number;
    maxVal?:number;
    tooltip?:boolean;
}

export interface viewData{
    clickValue:number,
    clickValue2?:number,
    baseValue:number
}

export class Presenter{
    private viewData:viewData;

    constructor (model:Model, view:View, options?:Options){
        
        view.setCustomView(model.getModelVals());
        //Если обьект опций передан, то они передаются в Вид и Модель
        if(options){
            this.setOptToModel(model, options);
            this.setOptToView(view, options);
            
        }       

        this.viewData = {clickValue:0, baseValue:0}
    }

    setOptToView(view:View, options:Options):void{
        let opt:Options = {};

        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                opt![key] = options[key];                    
            }
        }
        //Вызов функции изменения вида
        view.setCustomView(opt!); 
    }

    setOptToModel(model:Model, options:Options):void{
        model.setCustomModel(options);
    }

    getOptionsFromVIew(view:View, model:Model):void{
        if(view.runner2){
            this.viewData.clickValue2 = view.runner2.offsetLeft;
        }
        if(view.slider.classList.contains('vertical-view')){
            this.viewData.baseValue = view.base.offsetHeight;
            this.viewData.clickValue = view.base.offsetHeight - view.runner.offsetTop - view.runner.offsetHeight;

            if(view.runner2){
                this.viewData.clickValue2 = view.base.offsetHeight - view.runner2.offsetTop;
            }
        }else{
            this.viewData.baseValue = view.base.offsetWidth - view.runner.offsetWidth;
            this.viewData.clickValue = view.runner.offsetLeft;
        }

        model.setValues(this.viewData);
        view.changeView(model.getModelVals());

    }


}