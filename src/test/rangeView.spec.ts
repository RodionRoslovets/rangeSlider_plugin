import {View} from '../js/rangeView';

var assert = require('chai').assert;//достали утверждения из чая
var expect = require('chai').expect//достали ожидание из чая
var should = require('chai').should();//достали "должен быть" из чая

let view = new View();

describe('Тест вида', ()=>{
    it('Экземпляр вида имеет прототип вида', ()=>{
        expect(view).to.be.an.instanceOf(View);
    });
    it('Экземпляр вида имеет свойство rangeSlider', ()=>{
        expect(view).to.have.a.property('rangeSlider');
    });
    it('Экземпляр вида имеет свойство base', ()=>{
        expect(view).to.have.a.property('base');
    });
    it('Экземпляр вида имеет свойство filler', ()=>{
        expect(view).to.have.a.property('filler');
    });
    it('Экземпляр вида имеет свойство runer', ()=>{
        expect(view).to.have.a.property('runer');
    });
    it('Экземпляр вида имеет метод changeView', ()=>{
        expect(view).to.have.a.property('changeView');
    });
});