import { Options } from "./rangePresent";
export class View {
    public slider: HTMLElement;
    public base: HTMLElement;
    public filler: HTMLElement;
    public runner: HTMLElement;
    // public slider:number;
    // public base:number;
    // public filler:number;
    // public runner:number;

    constructor(all: HTMLElement) {
        // this.slider = 1;
        // this.runner = 1;
        // this.base = 1;
        // this.filler =1;
        this.slider = document.createElement('div');
        this.base = document.createElement('div');
        this.filler = document.createElement('div');
        this.runner = document.createElement('div');

        this.runner.classList.add('rangeByD-slider__runner');
        this.filler.classList.add('rangeByD-slider__filler');
        this.base.classList.add('rangeByD-slider__base');
        this.slider.classList.add('rangeByD-slider');

        this.base.appendChild(this.filler);
        this.base.appendChild(this.runner);
        this.slider.appendChild(this.base);

        this.runner.addEventListener('mousedown', this.moveSlider);
        this.base.addEventListener('mousedown', this.clickMove);

        all.appendChild(this.slider);

    }

    moveSlider(e) {
        let parent: HTMLElement = e.target.parentElement,
            runner: HTMLElement = e.target,
            runnerMiddle: number = runner.offsetWidth / 2,
            filler = e.target.previousElementSibling;

        document.onmousemove = (e) => {
            let x: number = e.pageX,
                click: number = x - parent.offsetLeft - runnerMiddle;

            click < -2 ? click = -2 : click = click;
            click >= (parent.offsetWidth - runnerMiddle) ? click = parent.offsetWidth - runnerMiddle : click = click;

            runner.style.left = click + "px";

            filler.style.width = click + runnerMiddle + 'px';
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
        let click: number = e.pageX - target.offsetLeft,
            baseRunner:HTMLElement,
            runnerHalf:number,
            filler:HTMLElement = target.firstChild;

        for (let i = 0; i < target.children.length;i++){
            if(target.children[i].classList.contains('rangeByD-slider__runner')){
                baseRunner = target.children[i];
            }
        }

        runnerHalf = baseRunner!.offsetWidth / 2;

        baseRunner!.style.left = click - runnerHalf + 'px';

        filler.style.width = click + 'px';
    }

}