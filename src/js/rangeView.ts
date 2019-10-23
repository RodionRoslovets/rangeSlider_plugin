import { Options } from "./rangePresent";
//Слой вида 
export class View {
    //Переменные - блок слайдера, база (черная рамка), заполнитель и бегунки (второй опциональный)
    public slider: HTMLElement;
    public base: HTMLElement;
    public filler: HTMLElement;
    public runner: HTMLElement;
    public runner2?: HTMLElement;
    public tooltip?:HTMLElement;
    public tooltip2?:HTMLElement;
    public values:HTMLElement;
    public rangeValue: HTMLElement;
    public rangeValue2?: HTMLElement; 
    public params: Options;

    constructor() {

        //Создали элементы в документе
        this.slider = document.createElement('div');
        this.base = document.createElement('div');
        this.filler = document.createElement('div');
        this.runner = document.createElement('div');
        this.values = document.createElement('div');
        this.rangeValue = document.createElement('div');

        //Назначаем классы
        this.runner.classList.add('rangeByD-slider__runner');
        this.runner.classList.add('left-runner');
        this.filler.classList.add('rangeByD-slider__filler');
        this.base.classList.add('rangeByD-slider__base');
        this.slider.classList.add('rangeByD-slider');
        this.values.classList.add('rangeByD-slider__values');
        this.rangeValue.classList.add('rangeByDi-slider__first-value');
                
        //Добавляем бегунок и заполнитель в базу 
        this.base.appendChild(this.runner);
        this.base.appendChild(this.filler);

        //Добавляем значения в блок значений
        this.values.appendChild(this.rangeValue);
        
        //Добавляем базу и значения в слайдер
        this.slider.appendChild(this.values);
        this.slider.appendChild(this.base);

        //Первому бегунку и базе назначаем соответствующие методы
        this.base.addEventListener('click', this.clickMove);
        
        this.params = {};
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
                click = parent.offsetHeight - (clickCoord - baseCoords.top) - runner.offsetHeight/2;

            } else {//если горизонтальный то из горизонтальных
                clickCoord = e.pageX;
                click = clickCoord - baseCoords.left - runnerMiddle;
            }
           
            //если бегунок вертикальный то проверки выполняются по вертикальным составляющим родителя
            if(runner.classList.contains('rangeByD-slider__runner__vertical')){
                click < 0 ? click = 0 : click = click;
                click >= parent.offsetHeight - runnerMiddle ? click = parent.offsetHeight - runner.offsetHeight/2 : click = click;
                //Если это верхний бегунок то расчитывается и назначается стиль top
                if(runner.classList.contains('top-runner')){
                    runner.style.top = parent.offsetHeight - click - runner.offsetHeight + "px";
                }else{
                    //Если это нижний бегунок то расчитывается и назначается стиль bottom
                    runner.style.bottom = click + "px";
                }
                
            } else {
                //Если бегунок горизонтальный то проверки выполняются по горизонтальным составляющим родителя
                click < 0 ? click = 0 : click = click;
                click >= parent.offsetWidth - runner.offsetWidth ? click = parent.offsetWidth - runner.offsetWidth : click = click;

                //Назначается стиль left
                runner.style.left = click + 'px';
                if(tooltip){
                    tooltip.style.left = click + 'px';
                }
            }
            
            //Расчеты заполнителя
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
    
    //Функция изменяющаяя параметры вида из презентера
    setCustomView(opt:Options):void{
        //Своему обьекту опций присваиваем обьект опций из параметров презентера
        for (let key in opt ){
            if(opt.hasOwnProperty(key)){
                this.params[key] = opt[key];
            }
        }       

        //Вариант с диапазоном
        if(this.params.range){
            //Создаем второй бегунок и назначаем ему классы
            this.runner2 = document.createElement('div');
            this.runner2.classList.add('rangeByD-slider__runner');
            this.runner2.classList.add('right-runner');
            //Создаем второе значение и назначаем ему классы
            this.rangeValue2 = document.createElement('div');
            this.rangeValue2.classList.add('rangeByDi-slider__second-value');
            this.values.classList.add('values-range');
            //Заполнителю присваиваем класс диапазон 
            this.filler.classList.add('filler-range');         
        }

        //Вариант с вертикальным видом
        if(this.params.vertical){
            //Элементам присваиваем классы вертикального вида
            this.slider.classList.add('vertical-view');
            this.base.classList.add('vertical-view');
            this.runner.classList.remove('left-runner');
            this.runner.classList.add('rangeByD-slider__runner__vertical');
            this.runner.classList.add('bottom-runner');
            this.values.classList.add('vertical-view');
            this.rangeValue.classList.add('vertical-value')
            this.filler.classList.add('vertical-view');

            //Вертикальный вид и диапазон
            if(this.params.range){
                //Создаем второй бегунок под вертикальный вид
                this.runner2 = document.createElement('div');
                this.runner2.classList.add('rangeByD-slider__runner');
                this.runner2.classList.add('rangeByD-slider__runner__vertical');
                this.runner2.classList.add('top-runner');
                this.values.classList.add('values-range');
                //Создаем второе значение и назначаем ему классы
                this.rangeValue2 = document.createElement('div');
                this.rangeValue2.classList.add('rangeByDi-slider__second-value');
                this.rangeValue2.classList.add('vertical-value');
                this.filler.classList.add('filler-range'); 
            }
        }

        //Вариант с подсказкой
        if(this.params.tooltip){
            this.tooltip = document.createElement('div');
            this.tooltip.classList.add('rangeByD-slider__tooltip');
            this.tooltip.innerText = `${this.params.minVal}`;
            this.base.insertBefore(this.tooltip, this.runner);
        }
        
        //  При наличии второго бегунка добавляяем его туда же и назначаем ему обработчик
        if(this.runner2 && this.rangeValue2){
            this.tooltip2 = document.createElement('div');
            this.tooltip2.classList.add('rangeByD-slider__tooltip');
            this.tooltip2.classList.add('tooltip-right');
            this.tooltip2.innerText = `${this.params.maxVal}`;
            this.base.appendChild(this.runner2);
            this.base.insertBefore(this.tooltip2, this.runner2);
            this.values.appendChild(this.rangeValue2);
        }

        //Если есть кастомные значения min и max
        if(this.params.minVal || this.params.minVal === 0){
            this.rangeValue.innerText = `${this.params.minVal}`;

            if(this.rangeValue2 && this.params.maxVal || this.params.maxVal === 0){
                this.rangeValue2!.innerText = `${this.params.maxVal}`;
            }
            
        }
        
    }

    changeView(opt):void{
        this.rangeValue.innerText = opt.minVal;
        if(this.rangeValue2){
            this.rangeValue2.innerText = opt.maxVal;
        }
        if(this.tooltip){
            this.tooltip.innerText = opt.minVal;
            if(this.tooltip2){
                this.tooltip2.innerText = opt.maxVal;
            }
        }
    }
    
}