import './js/rangeByDi.ts';
import './scss/new.scss';
import { Options } from './js/rangePresent';

let opt:Options = {
    range:false,
    minVal:-100,
    maxVal:100,
    tooltip:true,
    step:5,
    from:50
};
let opt2:Options = {
    range:true,
    minVal:0,
    maxVal:1000, 
    tooltip:true,
    step:5,
    from:500,
    to:600

};
let opt3:Options = {
    vertical:true,
    minVal:10, 
    maxVal:100, 
    tooltip:true,
    step:5
};
let opt4:Options = {
    range:true,
    vertical:true,
    minVal:100,
    maxVal:200,
    step:5
};


$('.one').myPlugin(opt);
$('.two').myPlugin(opt2);
$('.three').myPlugin();
$('.four').myPlugin(opt3);
$('.five').myPlugin(opt4);