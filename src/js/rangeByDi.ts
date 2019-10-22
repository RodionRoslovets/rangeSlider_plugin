// import  {Model} from  './rangeModel';
import  {View} from  './rangeView';
import  {Model} from  './rangeModel';
import  {Presenter} from  './rangePresent';
import  {Options} from  './rangePresent';
import { get } from 'http';

declare global{//Обьявляем глобальный интерфейс, т.к. при наличии импортов и экспортов изменения глобальных интерфейсов не происходят, так как создается новый тип
    interface JQuery {
        myPlugin: (options?:Options)=>void
    }
}

(function($){
     $.fn.myPlugin = function(options) {

        let view = new View(),
            model = new Model(),
            presenter = new Presenter(model, view, options);

        function getobj(){
            presenter.getOptionsFromVIew(view, model);            
        }

        view.runner.addEventListener('mousedown', view.moveSlider);
        view.runner.addEventListener('mousedown', ()=>{
            document.addEventListener('mousemove', getobj);
            
            document.addEventListener('mouseup', ()=>{
                document.removeEventListener('mousemove', getobj);
            });
        });

        if(view.runner2){
            view.runner2.addEventListener('mousedown', view.moveSlider);

            view.runner2.addEventListener('mousedown', ()=>{
                document.addEventListener('mousemove', getobj);
                
                document.addEventListener('mouseup', ()=>{
                    document.removeEventListener('mousemove', getobj);
                });
            });
        }
        
        this.html(view.slider);
        
        
    };
})(jQuery);