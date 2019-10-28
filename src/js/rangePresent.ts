import {View} from './rangeView';
import {Model} from './rangeModel';

export interface Options {
    range?:boolean;
    vertical?:boolean;
    minVal?:number;
    maxVal?:number;
    tooltip?:boolean;
    step?:number;
    from?:number;
    to?:number;
}

export interface viewData{
    clickValue:number,
    clickValue2?:number,
    baseValue:number
}

export class Presenter{
    private viewData:viewData;
    private options:Options;

    constructor (model:Model, view:View, options?:Options){
        this.options = {};
        for (let key in options){
            if(options.hasOwnProperty(key)){
                this.options[key] = options[key];
            }
        }

        view.setCustomView(model.getModelVals());
        //Если обьект опций передан, то они передаются в Вид и Модель
        if(options){
            this.setOptToModel(model, options);
            this.setOptToView(view, options);
            
        }       

        this.viewData = {clickValue:0, baseValue:0}
    }
    //Установка опций в вид
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
    //Устновка опций в модель
    setOptToModel(model:Model, options:Options):void{
        model.setCustomModel(options);
    }
    //Получение опций из вида и запуск функций модели для расчета
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

    //Функция движения ползунка при нажатии и движении мыши
    moveSlider(e) :void{

        //переменные - база, бегунок(на который нажали), середина бегунка, заполнитель, координаты базы относительно окна
        let parent = e.target.parentElement,
            runner: HTMLElement = e.target,
            runnerMiddle: number = runner.offsetWidth / 2,
            filler,
            tooltip,
            baseCoords = e.target.parentElement.getBoundingClientRect();
        
        //назначаем заполнитель в переменную    
        for(let i = 0; i < parent.children.length; i++){
            if(parent.children[i].classList.contains('rangeByD-slider__filler')){
                filler = parent.children[i];
            }
        }
        //Проверяем наличие подсказки
        if(runner.previousElementSibling && runner.previousElementSibling.classList.contains('rangeByD-slider__tooltip')){
            tooltip = runner.previousElementSibling;

            tooltip.classList.add('tooltip__visible');
        }             

        //По движению мыши двигаем ползунок и задаем положение и ширину/высоту заполнителю
        document.onmousemove = (e):void => {

            //переменные - координата клика относительно страницы и координата клика расчитаная
            let clickCoord: number,
                click: number;

            //Если бегунок вертикальный то переменные расчитываются из вертикальных составляющих
            if(runner.classList.contains('rangeByD-slider__runner__vertical')){
                clickCoord = e.clientY;
                click = Math.round(parent.offsetHeight - (clickCoord - baseCoords.top) - runner.offsetHeight/2);

            } else {//если горизонтальный то из горизонтальных
                clickCoord = e.pageX;
                click = Math.round(clickCoord - baseCoords.left - runnerMiddle);
            }
           
            //если бегунок вертикальный то проверки выполняются по вертикальным составляющим родителя
            if(runner.classList.contains('rangeByD-slider__runner__vertical')){
                click < 0 ? click = 0 : click = click;
                click >= parent.offsetHeight - runnerMiddle ? click = parent.offsetHeight - runner.offsetHeight/2 : click = click;
                //Если это верхний бегунок то расчитывается и назначается стиль top
                if(runner.classList.contains('top-runner')){
                    if(this.options){
                        if(this.options.step){
                            let pr = Math.round(parent.offsetHeight / ((this.options.maxVal! - this.options.minVal!) / this.options.step));
                            
                            for(;click % pr != 0;){
                                if(click % pr > pr/2){
                                    click++
                                }
                                else{
                                    click--
                                }
                            }                    
                            
                        }
                    }
                    runner.style.top = parent.offsetHeight - click - runner.offsetHeight + "px";

                    if(tooltip){
                        tooltip.style.top = parent.offsetHeight - click - runner.offsetHeight + "px";
                    }
                }else{
                    //Если это нижний бегунок то расчитывается и назначается стиль bottom
                    if(this.options){
                        if(this.options.step){
                            let pr = Math.round(parent.offsetHeight / ((this.options.maxVal! - this.options.minVal!) / this.options.step));
                            
                            for(;click % pr != 0;){
                                if(click % pr > pr/2){
                                    click++
                                }
                                else{
                                    click--
                                }
                            }                    
                            
                        }
                    }
                    runner.style.bottom = click + "px";
                    if(tooltip){
                        tooltip.style.bottom = click + "px";
                    }
                }
                
            } else {
                //Если бегунок горизонтальный то проверки выполняются по горизонтальным составляющим родителя
                click < 0 ? click = 0 : click = click;
                click >= parent.offsetWidth - runner.offsetWidth ? click = parent.offsetWidth - runner.offsetWidth : click = click;

                if(this.options){
                    if(this.options.step){
                        let pr = Math.round(parent.offsetWidth / ((this.options.maxVal! - this.options.minVal!) / this.options.step));
                        
                        for(;click % pr != 0;){
                            if(click % pr > pr/2){
                                click++
                            }
                            else{
                                click--
                            }
                        }                    
                        
                    }
                }
                //Назначается стиль left
                runner.style.left = click + 'px';
                if(tooltip){
                    tooltip.style.left = click + 'px';
                }
            }
            
            //Расчеты заполнителя горизонтальные
            //Если бегунок левый
            if(runner.classList.contains('left-runner')){
                //перебираем всех детей базы
                for(let i = 0; i < parent.children.length; i++){
                    //если есть правый бегунок
                    if(parent.children[i].classList.contains('right-runner')){
                        //заполнитель сдвигается на левый отступ левого бегунка и его размер это расстояние от левого до правого бегунка
                        filler.style.left = runner.offsetLeft + 'px';
                        filler.style.width = parent.children[i].offsetLeft - runner.offsetLeft + runnerMiddle + 'px';
                        
                        //Если левый бегунок дошел до правого, то он не идет дальше
                        if(runner.offsetLeft + runner.offsetWidth >= parent.children[i].offsetLeft){
                            runner.style.left = filler.nextElementSibling.offsetLeft - runner.offsetWidth + 'px';
                            filler.style.left = runner.style.left;
                            filler.style.width = 0 + 'px';
                        }
                        
                    } else {
                        //Если правого бегунка нет
                        filler.style.width = runner.offsetLeft + runnerMiddle + 'px';
                    }
                }                
            } else {
                //Если бегунок не левый
                //Если бегунок вертикальный
                if(runner.classList.contains('rangeByD-slider__runner__vertical')){
                    //Расчитываем значение заполнителя из вертикальных параметров
                    filler.style.height = parent.offsetHeight - runner.offsetTop - runner.offsetHeight/2 + 'px';
                }else {
                    //Расчитываем значения заполнителя из горизонтальных параметров
                    filler.style.width = runner.offsetLeft - filler.previousSibling.offsetLeft + runnerMiddle + 'px';

                    //Если правый бегунок дошел до левого, то дальше не двигается
                    if(runner.offsetLeft <= filler.previousElementSibling.offsetLeft + runner.offsetWidth){
                         runner.style.left = filler.previousElementSibling.offsetLeft + runner.offsetWidth + 'px';
                    }
                }
                
            } 

            //размеры и положение филлера вертикальные
            //Если бегунок нижний
            if(runner.classList.contains('bottom-runner')){
                //Ищем верхний бегунок
                for(let i= 0; i < parent.children.length; i++){
                    if(parent.children[i].classList.contains('top-runner')){
                        let topRunner:any = parent.children[i];
                        //Стили для заполнителя 
                        filler.style.bottom = runner.style.bottom;
                        filler.style.height = parent.offsetHeight - click - topRunner.offsetTop - runner.offsetHeight/2 + 'px';

                        //Если нижний бегунок дошел до верхнего то он не двигается
                        if(runner.offsetTop <= topRunner.offsetHeight + topRunner.offsetTop){
                            runner.style.bottom = parent.offsetHeight - (topRunner.offsetHeight*2 + topRunner.offsetTop) + 'px';
                            filler.style.bottom = runner.style.bottom;
                            filler.style.height = '0px';
                        }
                    }
                }
            } else {
                //Если не нижний
                //Ищем нижний бегунок
                for(let i = 0;i< parent.children.length;i++){
                    if(parent.children[i].classList.contains('bottom-runner')){
                        let bottomRunner:any = parent.children[i];
                        //Стили для заполнителя
                        filler.style.bottom = bottomRunner.style.bottom || '0px';
                        filler.style.height = parent.offsetHeight - runner.offsetTop - (parent.offsetHeight - bottomRunner.offsetTop) + runner.offsetHeight/2 + 'px';

                        //Если верхний бегунок доходит до нижнего то он останавливается
                        if(runner.offsetTop + runner.offsetHeight >= bottomRunner.offsetTop){
                            runner.style.top = bottomRunner.offsetTop - bottomRunner.offsetHeight + 'px';
                            filler.style.bottom = bottomRunner.style.bottom || '0px';
                            filler.style.height = '0px';
                        }
                    }
                }
            } 
            
            
        }
        
        //Отпустили кнопку мыши - функции приравнялись к null
        document.onmouseup = ():void => {
            if(runner.previousElementSibling && runner.previousElementSibling.classList.contains('rangeByD-slider__tooltip')){
                let tooltip = runner.previousElementSibling;
    
                tooltip.classList.remove('tooltip__visible');
            }
            document.onmousemove = document.onmouseup = null;
        } 
               
    }

     //Функция клика по базе и филлеру
     clickMove(e):void {
        //цель клика - база
        let target = e.target;

        for(let i = 0; i < e.path.length; i++){
            if(!target.classList.contains('rangeByD-slider__base')){
                target = e.target.parentElement;
            } else {
                break
            }            
        }
        //Переменные - координаты клика, массив бегунков, половина бегунка, заполнитель, координаты базы
        let click: number,
            runners:Array<HTMLElement> = [],
            runnerHalf:number,
            filler:HTMLElement,
            baseCoords = target.getBoundingClientRect();

        //Если база вертикальная то клик расчитывается по вертикальным составляющим
        if(target.classList.contains('vertical-view')){
            click = target.offsetHeight - (e.clientY - baseCoords.top);
        } else {
            //Если горизонтальная - по горизонтальным
            click = e.pageX - target.offsetLeft
        }

        //Бегунки добавляются в массив
        for (let i = 0; i < target.children.length;i++){
            if(target.children[i].classList.contains('rangeByD-slider__runner')){
                runners!.push(target.children[i]);
            }
        }

        //Определяется заполнитель
        for(let i = 0; i < target.children.length;i++){
            if(target.children[i].classList.contains('rangeByD-slider__filler')){
                filler = target.children[i];
            }
        }

        //Определяетяс половина филлера и половина первого бегунка
        let halfFiller:number = filler!.offsetWidth / 2;
        runnerHalf = runners![0].offsetWidth / 2;

        //Если бегунков 2
        if(runners!.length >= 2){
            //Переменная - первая зона (от левого или нижнего края базы до середины филлера)
            let firstZone:number;
            
            if(runners![0].classList.contains('rangeByD-slider__runner__vertical')){
                firstZone = target.offsetHeight - runners![0].offsetTop - runners![0].offsetHeight + filler!.offsetHeight / 2;
            } else {
                firstZone = runners![0].offsetLeft + halfFiller;
            }

            //Если координата клика попадает в первую зону то двигается нижний/левый бегунок
            if(click <= firstZone!){
                //Если вид вертикальный
                if(runners![0].classList.contains('rangeByD-slider__runner__vertical')){
                    runners![0].style.bottom = click - runnerHalf + 'px';
                    filler!.style.bottom = runners![0].style.bottom;
                    filler!.style.height = runners![0].offsetTop - runners![1].offsetTop + runners![0].offsetHeight/2 + 'px';
                } else {
                    //Если вид горизонтальный
                    runners![0].style.left = click - runnerHalf + 'px';
                    filler!.style.left = runners![0].style.left;
                    filler!.style.width = runners![1].offsetLeft - runners![0].offsetLeft + runnerHalf + 'px';
                }
                
            } else {
                //Если координата клика не попадает в первую зону то двигается правый/верхний бегунок
                //Вертикальный вид
                if(runners![0].classList.contains('rangeByD-slider__runner__vertical')){
                    runners![1].style.top = target.offsetHeight - click - runners![1].offsetHeight/2 + "px";
                    filler!.style.bottom = runners![0].style.bottom;
                    filler!.style.height = runners![0].offsetTop - runners![1].offsetTop + runners![0].offsetHeight/2 + 'px';
                }else {
                    //Горизонтальный вид
                    runners![1].style.left = click - runnerHalf + 'px';
                    filler!.style.left = runners![0].style.left;
                    filler!.style.width = runners![1].offsetLeft - runners![0].offsetLeft + runnerHalf + 'px';
                }
                
            }
        } else {
            //Если один бегунок
            if(runners![0].classList.contains('bottom-runner')){
                //вертикальный вид
                runners![0].style.bottom = click - runners![0].offsetHeight/2 + 'px';

                filler!.style.height = click + runnerHalf + 'px';
            } else {
                //горизонтальный вид
                runners![0].style.left = click - runnerHalf + 'px';

                filler!.style.width = click + runnerHalf + 'px';
            }
           
        }
             
    }


}