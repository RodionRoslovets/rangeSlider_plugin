// import  {Model} from  './rangeModel';
import  {View} from  './rangeView';
import  {Model} from  './rangeModel';
import  {Presenter} from  './rangePresent';
import  {Options} from  './rangePresent';

declare global{//Обьявляем глобальный интерфейс, т.к. при наличии импортов и экспортов изменения глобальных интерфейсов не происходят, так как создается новый тип
    interface JQuery {
        myPlugin: (options?:Options)=> void
    }
}

(function($){
     $.fn.myPlugin = function(options){

        let view = new View();
        this.html(view.slider); 
        let model = new Model(),
            presenter = new Presenter(model, view, options);

        

        function getobj():void{
            presenter.getOptionsFromVIew(view, model);            
        }

        view.runner.addEventListener('mousedown', presenter.moveSlider.bind(presenter));
        view.base.addEventListener('click', presenter.clickMove);
        view.runner.addEventListener('mousedown', ()=>{
            document.addEventListener('mousemove', getobj);

            document.addEventListener('mouseup', ()=>{
                document.removeEventListener('mousemove', getobj);
            });
        });
        view.base.addEventListener('click', getobj);
        
        

        if(view.runner2){
            view.runner2.addEventListener('mousedown', presenter.moveSlider.bind(presenter));
            view.runner2.addEventListener('mousedown', ()=>{
                document.addEventListener('mousemove', getobj);
                
                document.addEventListener('mouseup', ()=>{
                    document.removeEventListener('mousemove', getobj);
                });
            });
        }
    };
})(jQuery);