// import { Options } from './rangePresent';
import { viewOpt } from './rangePresent';
export class View{
    public rangeSlider: string;
    // public base:string;
    // public filler:string;
    // public runer:string;
    public newOpt: viewOpt;

    constructor() {
        
        // this.filler = '<div class="range-filler"></div>';
        // this.runer = '<div class="range-runer"></div>';
        // this.base = `<div class="range-base">${this.filler}${this.runer}</div>`;
        this.rangeSlider = `<div class="range-slider"></div>`;
        this.newOpt = {background:'', width:0, height:0, p:0};
    }

    changeView() {
        // this.filler = '<div class="range-filler"></div>';
        // this.runer = '<div class="range-runer"></div>';
        // this.base = `<div class="range-base">${this.filler}${this.runer}</div>`;
        this.rangeSlider = `<div class="range-slider" style="background:${this.newOpt.background}; width:${this.newOpt.width}px; height:${this.newOpt.height}px;">${this.newOpt.p}</div>`;
    }
}