import {Model} from '../js/rangeModel';

var assert = require('chai').assert;//достали утверждения из чая
var expect = require('chai').expect//достали ожидание из чая
var should = require('chai').should();//достали "должен быть" из чая

let model = new Model();

describe('Тест модели', ()=>{
    it('Экземпляр имеет прототип модели', ()=>{
        expect(model).to.be.an.instanceOf(Model);
    });
    it('модель имеет свойство минимум', ()=>{
        expect(model).to.have.property('min');
    });
    it('свойство минимум это число', ()=>{
        assert.isNumber(model.min);
    });
    it('модель имеет свойство максимум', ()=>{
        expect(model).to.have.property('max');
    });
    it('свойство максимум это число', ()=>{
        assert.isNumber(model.max);
    });
    it('модель имеет свойство шаг', ()=>{
        expect(model).to.have.property('step');
    });
    it('свойство шаг это число', ()=>{
        assert.isNumber(model.step);
    });
    it('модель имеет свойство диапазон', ()=>{
        expect(model).to.have.property('range');
    });
    it('свойство диапазон логическое', ()=>{
        assert.isBoolean(model.range);
    });
    
});