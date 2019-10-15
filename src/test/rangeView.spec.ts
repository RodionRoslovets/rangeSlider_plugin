import {View} from '../js/rangeView';

var assert = require('chai').assert;//достали утверждения из чая
var expect = require('chai').expect//достали ожидание из чая
var should = require('chai').should();//достали "должен быть" из чая

// let view = new View();

// describe("Тестирование Вида", ()=>{
//     it("Вид имеет свойство base", ()=>{
//         assert.property(view, "base");
//     });
//     it("Вид имеет свойство filler", ()=>{
//         assert.property(view, "filler");
//     });
//     it("Вид имеет свойство runner", ()=>{
//         assert.property(view, "runner");
//     });
//     it("Вид имеет свойство slider", ()=>{
//         assert.property(view, 'slider');
//     });
//     it("Вид имеет метод moveSlider", ()=>{
//         assert.property(view, 'moveSlider');
//     });
//     it("Вид имеет метод clickMove", ()=>{
//         assert.property(view, 'clickMove');
//     });
// });