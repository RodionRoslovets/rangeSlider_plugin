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

    //Функция движения бегунка
    moveSlider(e){

        //Переменные - родитель (база), бегунок(цель клика), координаты базы
        let parent: HTMLElement = e.target.parentElement,
            runner: HTMLElement = e.target,
            baseCoords = e.target.parentElement.getBoundingClientRect();
        
        //При движении мыши двигаем за ней ползунок
        document.onmousemove=(e)=>{

            //переменные - координата клика относительно страницы и координата клика расчитаная
            let clickCoord: number,
                click: number;

            //Если бегунок вертикальный то переменные расчитываются из вертикальных составляющих
            if(runner.classList.contains('rangeByD-slider__runner__vertical')){
                clickCoord = e.clientY;
                click = Math.round(parent.offsetHeight - (clickCoord - baseCoords.top) - runner.offsetHeight/2);

                //Проверка на вхождение в базу
                click < 0 ? click = 0 : click = click;
                click >= parent.offsetHeight - runner.offsetHeight ? click = parent.offsetHeight - runner.offsetHeight : click = click;

                //Если бегунок верхний то меняем стиль top
                if(runner.classList.contains('top-runner')){                   
                    runner.style.top = parent.offsetHeight - click - runner.offsetHeight + "px";
                } else {
                    //Если это нижний бегунок то расчитывается и назначается стиль bottom
                    runner.style.bottom = click + "px";
                }
            } else {
                //Если бегунок горизонтальный то переменные расчитываются из горизонтальных составляющих
                clickCoord = e.pageX;
                click = Math.round(clickCoord - baseCoords.left - runner.offsetWidth/2);

                //Проверка на вхождение в базу
                click < 0 ? click = 0 : click = click;
                click >= parent.offsetWidth - runner.offsetWidth ? click = parent.offsetWidth - runner.offsetWidth : click = click;

                //Назначается стиль left независимо от того левый или правый бегунок
                runner.style.left = click + 'px';
            }  
            //Проверка на достижение второго бегунка

            //Проверяем наличие второго бегунка
            let runners:Array<any> = [];
            for(let i = 0; i < parent.children.length;i++){
                if(parent.children[i].classList.contains('rangeByD-slider__runner')){
                    runners.push(parent.children[i]);
                }
            }
            
            //Если бегунков два, то назначаем проверку в зависимости от бегунка
            if(runners.length == 2){
                if(runner.classList.contains('left-runner')){
                    if(runner.offsetLeft + runner.offsetWidth >= runners[1].offsetLeft){
                        runner.style.left = runners[1].offsetLeft - runner.offsetWidth + 'px';
                    }
                } else if(runner.classList.contains('right-runner')){
                    if(runner.offsetLeft <= runners[0].offsetLeft + runners[0].offsetWidth){
                        runner.style.left = runners[0].offsetLeft + runner.offsetWidth + 'px';
                    }
                } else if(runner.classList.contains('top-runner')){
                    if(runner.offsetTop + runner.offsetHeight > runners[0].offsetTop){
                        runner.style.top = runners[0].offsetTop - runner.offsetHeight + 'px';
                    }
                } else if(runner.classList.contains('bottom-runner')){
                    if(runner.offsetTop < runners[1].offsetTop + runners[1].offsetHeight){
                        runner.style.bottom = parent.offsetHeight - (runners[1].offsetTop + runners[1].offsetHeight * 2) + 'px';
                    }
                }
            }

            
            
            //Вызываем изменение филлера
            this.changeFiller(runner);
        }
        //Отпустили кнопку мыши - функции приравнялись к null
        document.onmouseup = ():void => {
            //при наличии ултипа делаем его невидимым
            if(runner.previousElementSibling){
                if(runner.previousElementSibling!.classList.contains('tooltip__visible')){
                    runner.previousElementSibling!.classList.remove('tooltip__visible');
                }
            }            

            //обнуляем функции
            document.onmousemove = document.onmouseup = null;
        } 
    }

    //Функция изменения филлера
    changeFiller(e: HTMLElement){
        //Переменные - филлер, бегунок и массив бегунков
        let runner: HTMLElement = e,
            filler,
            runners:Array<any> = [];
        
        //Обозначаем филлер и массив бегунков
        for(let i = 0;i < runner.parentElement!.children.length; i++){
            if(runner.parentElement!.children[i].classList.contains('rangeByD-slider__filler')){
                filler = runner.parentElement!.children[i];
            }
            if(runner.parentElement!.children[i].classList.contains('rangeByD-slider__runner')){
                runners.push(runner.parentElement!.children[i]);
            }
        }
        
        //Если филлер горизонтальный
        if(!filler.classList.contains('vertical-view')){
            //Если филлер обычный
            if(!filler.classList.contains('filler-range')){
                filler.style.width = runner.offsetLeft + runner.offsetWidth/2 + 'px';
            } else {
                //Если филлер для диапазона
                //Если движется левый бегунок
                if(runner.classList.contains('left-runner')){
                    filler.style.left = runner.offsetLeft + runner.offsetWidth/2 + 'px';
                    filler.style.width = runners[1].offsetLeft - runner.offsetLeft + 'px';
                } else {
                    //Если бегунок правый
                    filler.style.width = runner.offsetLeft - runners[0].offsetLeft + runner.offsetWidth/2 + 'px';
                }                    
            }
        } //Если филлер вертикальный
        else {
            //Если филлер обычный
            if(!filler.classList.contains('filler-range')){
                filler.style.height = runner.parentElement!.offsetHeight - runner.offsetTop - runner.offsetHeight/2 + 'px';
            } else {
                //Если филлер для диапазона 
                //Если движется нижний бегунок
                if(runner.classList.contains('bottom-runner')){
                    filler.style.bottom = runner.parentElement!.offsetHeight - runner.offsetTop - runner.offsetHeight/2 + 'px';
                    filler.style.height = (runner.parentElement!.offsetHeight - runners[1].offsetTop) - (runner.parentElement!.offsetHeight - runner.offsetTop) + 'px';
                } else {
                    //Если движется верхний бегунок
                    filler.style.height = (runner.parentElement!.offsetHeight - runner.offsetTop) - (runner.parentElement!.offsetHeight - runners[0].offsetTop) + runner.offsetHeight/4 + 'px';
                }
            }
        }  

        //При необходимости запускаем нужные функции
        if(this.options){
            //Если есть подсказка
            if(this.options.tooltip){
                this.moveTooltip(runner);
            }
        }     
    }

    //Функция движения тултипа
    moveTooltip(e){
        //Переменные - бегунок, тултип
        let runner = e,
            tooltip = runner.previousElementSibling;

        //Делаем тултип видимым
        tooltip.classList.add('tooltip__visible');

        //Если тултип вертикальный и верхний
        if(tooltip.classList.contains('tooltip-top')){
            tooltip.style.top = runner.style.top;
        } else if(tooltip.classList.contains('tooltip-bottom')){
            //Есди тултип нижний
            tooltip.style.bottom = runner.style.bottom;
        } else { //если тултип горизонтальный
            tooltip.style.left = runner.style.left;
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