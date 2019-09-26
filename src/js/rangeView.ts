import {Options} from './rangePresent';
export class View{
    public rangeSlider: string;
    public base:string;
    public filler:string;
    public runer:string;
    
    constructor(){
        this.filler = '<div class="range-filler"></div>';
        this.runer = '<div class="range-runer"></div>';
        this.base = `<div class="range-base">${this.filler}${this.runer}</div>`;
        this.rangeSlider = `<div class="range-slider">${this.base}</div>`;
    }
    changeView(){

    }
}