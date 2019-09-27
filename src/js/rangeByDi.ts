import  {Model} from  './rangeModel';
import  {View} from  './rangeView';
import  {Presenter} from  './rangePresent';
import  {Options} from  './rangePresent';
import  {viewOpt} from  './rangePresent';

declare global{//Обьявляем глобальный интерфейс, т.к. при наличии импортов и экспортов изменения глобальных интерфейсов не происходят, так как создается новый тип
    interface JQuery {
        myPlugin: (options:Options, viewOpt?:viewOpt)=>void
    }
}

(function($){
     $.fn.myPlugin = function(options:Options, viewOpt?:viewOpt) {

        let model = new Model(),
            view = new View(),
            present = new Presenter(options, model);

        present.changeModel(model);
        model.setProps(model.newOpt);

        // console.log(model);
        this.html(view.rangeSlider);

        if(viewOpt){
            present.changeView(view, viewOpt, model);
            view.changeView();
        }
                
        this.html(view.rangeSlider);
    };
})(jQuery);