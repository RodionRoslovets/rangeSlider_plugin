import { Options } from "./rangePresent";
export class View {
    public slider: HTMLElement;
    public base: HTMLElement;
    public filler: HTMLElement;
    public runner: HTMLElement;
    public runner2?: HTMLElement;
    // public slider:number;
    // public base:number;
    // public filler:number;
    // public runner:number;

    constructor(options?:Options) {
        // this.slider = 1;
        // this.runner = 1;
        // this.base = 1;
        // this.filler =1;
        this.slider = document.createElement('div');
        this.base = document.createElement('div');
        this.filler = document.createElement('div');
        this.runner = document.createElement('div');

        this.runner.classList.add('rangeByD-slider__runner');
        this.runner.classList.add('left-runner');
        this.filler.classList.add('rangeByD-slider__filler');
        this.base.classList.add('rangeByD-slider__base');
        this.slider.classList.add('rangeByD-slider');

        if(options){
            if(options.range){
                this.runner2 = document.createElement('div');
                this.runner2.classList.add('rangeByD-slider__runner');
                this.runner2.classList.add('right-runner');
                this.filler.classList.add('filler-range');         
            }
            if(options.vertical){
                this.slider.classList.add('vertical-view');
                this.base.classList.add('vertical-view');
                this.runner.classList.remove('left-runner');
                this.runner.classList.add('rangeByD-slider__runner__vertical');
                this.runner.classList.add('bottom-runner');
                this.filler.classList.add('vertical-view');
            }
        }

        this.base.appendChild(this.runner);
        this.base.appendChild(this.filler);
        
        if(this.runner2){
            this.base.appendChild(this.runner2);
            this.runner2.addEventListener('mousedown', this.moveSlider);
        }
        this.slider.appendChild(this.base);
        
        this.runner.addEventListener('mousedown', this.moveSlider);
        this.base.addEventListener('click', this.clickMove);


    }

    moveSlider(e) {
        let parent: HTMLElement = e.target.parentElement,
            runner: HTMLElement = e.target,
            runnerMiddle: number = runner.offsetWidth / 2,
            filler,
            // runnerCoords = e.target.getBoundingClientRect(),
            baseCoords = e.target.parentElement.getBoundingClientRect();
            
        for(let i = 0; i < parent.children.length; i++){
            if(parent.children[i].classList.contains('rangeByD-slider__filler')){
                filler = parent.children[i];
            }
        }

        document.onmousemove = (e) => {
            let clickCoord: number,
                click: number;

            if(runner.classList.contains('rangeByD-slider__runner__vertical')){
                clickCoord = e.clientY;
                click = parent.offsetHeight - (clickCoord - baseCoords.top) - runner.offsetHeight/2;

            } else {
                clickCoord = e.pageX;
                click = clickCoord - baseCoords.left - runnerMiddle;
            }
           
            if(runner.classList.contains('rangeByD-slider__runner__vertical')){
                click < 0 ? click = 0 : click = click;
                click >= parent.offsetHeight - runnerMiddle ? click = parent.offsetHeight - runner.offsetHeight/2 : click = click;
                runner.style.bottom = click + "px";
            } else {
                click < -2 ? click = -2 : click = click;
                click >= parent.offsetWidth - runnerMiddle ? click = parent.offsetWidth - runnerMiddle : click = click;

                runner.style.left = click + 'px';
            }
            

            if(runner.classList.contains('left-runner')){
                for(let i = 0; i < parent.children.length; i++){
                    if(parent.children[i].classList.contains('right-runner')){
                        filler.style.left = runner.offsetLeft + 'px';
                        filler.style.width = filler.nextElementSibling.offsetLeft - runner.offsetLeft + runnerMiddle + 'px';
                        
                        if(runner.offsetLeft + runner.offsetWidth >= filler.nextElementSibling.offsetLeft){
                            runner.style.left = filler.nextElementSibling.offsetLeft - runner.offsetWidth + 'px';
                            filler.style.left = runner.style.left;
                            filler.style.width = 0 + 'px';
                        }
                        
                    } else {
                        filler.style.width = runner.offsetLeft + runnerMiddle + 'px';
                    }
                }                
            } else {
                if(runner.classList.contains('rangeByD-slider__runner__vertical')){
                    filler.style.height = parent.offsetHeight - runner.offsetTop - runner.offsetHeight/2 + 'px';
                }else {
                    filler.style.width = runner.offsetLeft - filler.previousSibling.offsetLeft + runnerMiddle + 'px';

                    if(runner.offsetLeft <= filler.previousElementSibling.offsetLeft + runner.offsetWidth){
                         runner.style.left = filler.previousElementSibling.offsetLeft + runner.offsetWidth + 'px';
                    }
                }
                
            }       
        }

        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
        }        
    }

    clickMove(e) {
        let target = e.target;

        for(let i = 0; i < e.path.length; i++){
            if(!target.classList.contains('rangeByD-slider__base')){
                target = e.target.parentElement;
            } else {
                break
            }            
        }
        
        let click: number,
            runners:Array<HTMLElement> = [],
            runnerHalf:number,
            filler:HTMLElement,
            baseCoords = target.getBoundingClientRect();

        if(target.classList.contains('vertical-view')){
            click = target.offsetHeight - (e.clientY - baseCoords.top);
        } else {
            click = e.pageX - target.offsetLeft
        }

        for (let i = 0; i < target.children.length;i++){
            if(target.children[i].classList.contains('rangeByD-slider__runner')){
                runners!.push(target.children[i]);
            }
        }

        for(let i = 0; i < target.children.length;i++){
            if(target.children[i].classList.contains('rangeByD-slider__filler')){
                filler = target.children[i];
            }
        }

        let halfFiller:number = filler!.offsetWidth / 2;
        runnerHalf = runners![0].offsetWidth / 2;

        if(runners!.length >= 2){
            let firstZone = runners![0].offsetLeft + halfFiller;

            if(click <= firstZone){
                runners![0].style.left = click - runnerHalf + 'px';
                filler!.style.left = runners![0].style.left;
                filler!.style.width = runners![1].offsetLeft - runners![0].offsetLeft + runnerHalf + 'px';
            } else {
                runners![1].style.left = click - runnerHalf + 'px';
                filler!.style.left = runners![0].style.left;
                filler!.style.width = runners![1].offsetLeft - runners![0].offsetLeft + runnerHalf + 'px';
            }
        } else {
            if(runners![0].classList.contains('bottom-runner')){
                runners![0].style.bottom = click - runners![0].offsetHeight/2 + 'px';

                filler!.style.height = click + runnerHalf + 'px';
            } else {
                runners![0].style.left = click - runnerHalf + 'px';

                filler!.style.width = click + runnerHalf + 'px';
            }
           
        }
        
        

        // click > target.offsetWidth ? click = target.offsetWidth : click = click;
        // click <= -2 ? click = -2 : click = click;

        
    }
    
}