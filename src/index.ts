import './js/rangeByDi.ts';
import './scss/new.scss';
import { Options } from './js/rangePresent';

let opt:Options = {
    min :12,
    max:15,
    range:true
};
let aaa = document.getElementsByClassName('one')[0];
let bbb = document.getElementsByClassName('two')[0];

$('.one').myPlugin(opt, aaa);
$('.two').myPlugin(opt, bbb);