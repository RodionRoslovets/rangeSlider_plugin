import {Presenter} from '../js/rangePresent';


var assert = require('chai').assert;//достали утверждения из чая
var expect = require('chai').expect//достали ожидание из чая
var should = require('chai').should();//достали "должен быть" из чая

let presenter = new Presenter({min:1, max:100, step:1, range:false});

describe('Тест представления', ()=>{
    it('Экземпляр представления имеет свойство минимум', ()=>{
        expect(presenter).to.have.property('min');
    });
    it('Экземпляр представления имеет свойство максимум', ()=>{
        expect(presenter).to.have.property('max');
    });
    it('Экземпляр представления имеет свойство шаг', ()=>{
        expect(presenter).to.have.property('step');
    });
    it('Экземпляр представления имеет свойство диапазон', ()=>{
        expect(presenter).to.have.property('range');
    });
    it('Экземпляр представления имеет метод changeModel', ()=>{
        expect(presenter).to.have.property('changeModel');
    });
    it('Экземпляр представления имеет метод changeView', ()=>{
        expect(presenter).to.have.property('changeView');
    });
});
