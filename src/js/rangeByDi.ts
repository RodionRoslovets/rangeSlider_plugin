
import  {Model} from  './rangeModel';
import  {View} from  './rangeView';
import  {Options} from  './rangeModel';

// interface JQuery {
//     myPlugin: (text:string, big:boolean) => void
// }
// interface Options{
//     fontSize: string,
//     background: string
// }
// import {Model} from './rangeModel';
// (function($){
//      $.fn.myPlugin = function(a, b) :void {
//         // if(b){
//         //     // let opt: Options = {
//         //     //     fontSize: '30px',
//         //     //     background: 'yellow'
//         //     // }
//         //     this.html(a);
//         //     this.css({'font-size':opt.fontSize, 'background':opt.background}); 
//         // }
//         this.html(a);
   
//     };
// })(jQuery);

let model = new Model();
let view = new View();


console.log(view);
console.log(model);
