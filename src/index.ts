import './js/rangeByDi.ts';
import './scss/new.scss';
import { Options } from './js/rangePresent';

let opt:Options = {
    range:false,
    minVal:-50,
    maxVal:50,
    tooltip:true
};
let opt2:Options = {
    range:true,
    minVal:0,
    maxVal:999, 
    tooltip:true
};
let opt3:Options = {
    vertical:true,
    minVal:10, 
    maxVal:100, 
    tooltip:true
};
let opt4:Options = {
    range:true,
    vertical:true,
    minVal:100,
    maxVal:200
};


$('.one').myPlugin(opt);
$('.two').myPlugin(opt2);
$('.three').myPlugin();
$('.four').myPlugin(opt3);
$('.five').myPlugin(opt4);