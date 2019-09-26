import './js/rangeByDi.ts';
import { Options } from './js/rangePresent';

let opt:Options = {
    min :12,
    max:15,
    range:true
}, opt2:Options = {
    min :34654,
    max:1345,
    step:3,
    range:false
}, opt3:Options = {
    min :0,
    max:0,
    step:0,
    range:true
};
$('.one').myPlugin(opt);
$('.two').myPlugin(opt2);
$('.three').myPlugin(opt3);