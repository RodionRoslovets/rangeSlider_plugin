// import  {Model} from  './rangeModel';
import  {View} from  './rangeView';
import  {Presenter} from  './rangePresent';
import  {Options} from  './rangePresent';

declare global{//Обьявляем глобальный интерфейс, т.к. при наличии импортов и экспортов изменения глобальных интерфейсов не происходят, так как создается новый тип
    interface JQuery {
        myPlugin: (options:Options, cont)=>void
    }
}

(function($){
     $.fn.myPlugin = function(options:Options, cont) {
        let view = new View(cont);
    };
})(jQuery);