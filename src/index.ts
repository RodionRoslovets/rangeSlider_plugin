import './js/rangeByDi.ts';
import './scss/new.scss';
import { Options } from './js/rangePresent';

let opt:Options = {
    range:false
};
let opt2:Options = {
    range:true
};
let opt3:Options = {
    vertical:true
};


$('.one').myPlugin(opt);
$('.two').myPlugin(opt2);
$('.three').myPlugin();
$('.four').myPlugin(opt3);