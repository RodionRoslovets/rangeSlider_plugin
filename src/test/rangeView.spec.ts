import {View} from '../js/rangeView';

var assert = require('chai').assert;//достали утверждения из чая
var expect = require('chai').expect//достали ожидание из чая
var should = require('chai').should();//достали "должен быть" из чая

let view = new View();

describe('Тест вида', ()=>{
    it('Экземпляр имеет прототип вида', ()=>{
        expect(view).to.be.an.instanceOf(View);
    });
    it('Экземпляр имеет свойство rangeSlider', ()=>{
        expect(view).to.have.a.property('rangeSlider');
    });
    it('Экземпляр имеет свойство base', ()=>{
        expect(view).to.have.a.property('base');
    });
    it('Экземпляр имеет свойство filler', ()=>{
        expect(view).to.have.a.property('filler');
    });
    it('Экземпляр имеет свойство runer', ()=>{
        expect(view).to.have.a.property('runer');
    });
});