import './js/rangeByDi.ts';
import './scss/new.scss';
import { Options } from './js/rangePresent';

let opt:Options = {
    range:false,
    minVal:0,
    maxVal:100
};
let opt2:Options = {
    range:true,
    minVal:100,
    maxVal:999
};
let opt3:Options = {
    vertical:true,
    minVal:1000,
    maxVal:9999
};
let opt4:Options = {
    range:true,
    vertical:true,
    minVal:10000
};


$('.one').myPlugin(opt);
$('.two').myPlugin(opt2);
$('.three').myPlugin();
$('.four').myPlugin(opt3);
$('.five').myPlugin(opt4);