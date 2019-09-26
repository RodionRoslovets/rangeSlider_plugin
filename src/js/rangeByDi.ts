import  {Model} from  './rangeModel';
import  {View} from  './rangeView';
import  {Presenter} from  './rangePresent';
import  {Options} from  './rangePresent';

declare global{//Обьявляем глобальный интерфейс, т.к. при наличии импортов и экспортов изменения глобальных интерфейсов не происходят, так как создается новый тип
    interface JQuery {
        myPlugin: (options:Options)=>void
    }
}

(function($){
     $.fn.myPlugin = function(options:Options) {

        let model = new Model(),
            view = new View(),
            present = new Presenter(options, model);

        present.changeModel(model, {min:16, max:6666, range:false});
        model.setProps(model.newOpt);

        console.log(model);

        
        
        this.html(view.rangeSlider);


    };
})(jQuery);