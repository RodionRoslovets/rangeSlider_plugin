import {Model} from '../js/rangeModel';

var assert = require('chai').assert;//достали утверждения из чая
var expect = require('chai').expect//достали ожидание из чая
var should = require('chai').should();//достали "должен быть" из чая

let model = new Model();

describe('Тест модели', ()=>{
    it('Экземпляр модели имеет прототип модели', ()=>{
        expect(model).to.be.an.instanceOf(Model);
    });
    it('Экземпляр модели имеет свойство минимум', ()=>{
        expect(model).to.have.property('min');
    });
    it('свойство минимум это число', ()=>{
        assert.isNumber(model.getProps().min);
    });
    it('Экземпляр модели имеет свойство максимум', ()=>{
        expect(model).to.have.property('max');
    });
    it('свойство максимум это число', ()=>{
        assert.isNumber(model.getProps().max);
    });
    it('Экземпляр модели имеет свойство шаг', ()=>{
        expect(model).to.have.property('step');
    });
    it('свойство шаг это число', ()=>{
        assert.isNumber(model.getProps().step);
    });
    it('Экземпляр модели имеет свойство диапазон', ()=>{
        expect(model).to.have.property('range');
    });
    it('свойство диапазон логическое', ()=>{
        assert.isBoolean(model.getProps().range);
    });
    it('Экземпляр модели имеет метод getProps', ()=>{
        expect(model).to.have.property('getProps');
    });
    it('getProps() возвращает обьект', ()=>{
        assert.isObject(model.getProps());
    });
    it('Экземпляр модели имеет метод setProps', ()=>{
        expect(model).to.have.property('setProps');
    });
    it('Экземпляр модели имеет метод count', ()=>{
        expect(model).to.have.property('count');
    });
    it('метод count возвращает число', ()=>{
        assert.isNumber(model.count({min:2, max:2, range:false}));
    });
    it('Экземпляр модели имеет метод getRes', ()=>{
        expect(model).to.have.property('getRes');
    });
});