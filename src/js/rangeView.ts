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
        // this.base.addEventListener('click', this.clickMove);
        
        this.params = {};
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
            if(this.params.vertical){
                this.tooltip.classList.add('tooltip-bottom');
            }
        }
        
        //  При наличии второго бегунка добавляем его в базу и назначаем ему обработчик
        if(this.runner2 && this.rangeValue2){
            this.base.appendChild(this.runner2);
            //добавляем тултип
            if(this.params.tooltip){
                this.tooltip2 = document.createElement('div');
                this.tooltip2.classList.add('rangeByD-slider__tooltip');
                this.tooltip2.classList.add('tooltip-right');
                this.tooltip2.innerText = `${this.params.maxVal}`;

                if(this.runner2.classList.contains('rangeByD-slider__runner__vertical')){
                    this.tooltip2.classList.remove('tooltip-right');
                    this.tooltip2.classList.add('tooltip-top');
                }

                this.base.insertBefore(this.tooltip2, this.runner2);
            }
            
            this.values.appendChild(this.rangeValue2);
        }

        //Если есть кастомные значения min и max
        if(this.params.minVal || this.params.minVal === 0){
            this.rangeValue.innerText = `${this.params.minVal}`;

            if(this.rangeValue2){
                this.rangeValue2.innerText = `${this.params.maxVal}`;
            }
            
        } 
        //Если есть значения старта
        // if(this.params.from){
        //     this.rangeValue.innerText = `${this.params.from}`;
        //     let width = this.base.offsetWidth / 100,
        //         place = this.params.from / (this.params.maxVal! - this.params.minVal!) * 100; 

        //     if(this.params.minVal! < 0){
        //         place = this.params.from + (Math.abs(this.params.minVal!)) / (this.params.maxVal! - this.params.minVal!) * 100 ;
        //     }

        //     this.runner.style.left = place * width - this.runner.offsetWidth/2 + 'px';
        //     this.filler.style.width = place * width + this.runner.offsetWidth/2 + 'px';
        // }
        // if(this.rangeValue2){
        //     if(this.params.to){
        //         this.rangeValue2.innerText = `${this.params.to}`;
        //         let width = this.base.offsetWidth / 100,
        //         place = this.params.to / (this.params.maxVal! - this.params.minVal!) * 100; 
        //         this.runner2!.style.left = place * width + 'px';
        //         this.filler.style.left = this.runner.style.left;
        //         this.filler.style.width = place * width - this.runner.offsetLeft + this.runner.offsetWidth/2 + 'px';
        //     }
        // }
        
        
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