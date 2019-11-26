import http from 'http';
import assert from 'assert';
import Range from '../lib/Range.js'
import Hand from '../lib/Hand.js'
import ProcessRange, {
  getCombosFromIndex,
  combosToHands
} from '../lib/processRange.js'
import {
  isFlushDraw,
  isBackDoorFlushDraw,
  isOESD,
  isGutshot
  } from '../lib/Draws'
import processRange from '../lib/processRange.js';
//import server from '../lib/index.js';

// describe('Example Node Server', () => {
//   it('should return 200', done => {
//     http.get('http://127.0.0.1:1337', res => {
//       assert.equal(200, res.statusCode);
//       server.close();
//       done();
//     });
//   });
//   it('should parse history', done => {
//     const utg20to25 = '77+, A2s+, KTs+, QTs+, JTs, T9s, 98s, ATo+, KJo+'
//     const range = new Range(utg20to25)
//     console.log(range.hands)
//     done()
//   })
//   it('should parse hand', done => {
//     const hand = new Hand(['Kc', '3d', '4h', '7s', '6c', '5d', 'Kh']);
    
//     console.log(hand)
//     done()
//   })

// });

describe('Draws', () =>{
  it('should return true on flush draw', done =>{
    const hand = ['Kh', '3h', '4h', '7h', '6c']
    const subject = isFlushDraw(hand)
    assert(subject)
    done() 
  })
  it('should return false on non flush draw', done =>{
    const hand = ['Kh', '3h', '4c', '7h', '6c']
    const subject = isFlushDraw(hand)
    assert(subject == false)
    done() 
  })
  it('should return true on backdoor flush draw', done =>{
    const hand = ['Kh', '3h', '4h', '7c', '6c']
    const subject = isBackDoorFlushDraw(hand)
    assert(subject)
    done() 
  })
  it('should return false on flush draw', done =>{
    const hand = ['Kh', '3h', '4h', '7h', '6c']
    const subject = isBackDoorFlushDraw(hand)
    assert(subject == false)
    done() 
  })
  it('should return false on rainbow', done =>{
    const hand = ['Ks', '3d', '4c', '7h', '6c']
    const subject = isBackDoorFlushDraw(hand)
    assert(subject == false)
    done() 
  })
  it('should return false on gutshot', done => {
    const hand = ['3d', '4c', '7h', '6c']
    assert(isOESD(hand) === false)
    done()
  })
  it('should return false on non oesd', done => {
    const hand = ['3d', '3c', '3h', '6c']
    assert(isOESD(hand) === false)
    done()
  })
  it('should return true on oesd', done => {
    const hand = ['2d', '3c', '4h', '5c']
    assert(isOESD(hand) === true)
    done()
  })
  it('should return true on oesd', done => {
    const hand = ['6d', 'Tc', '3c', '4h', '5c']
    assert(isOESD(hand) === true)
    done()
  })
  it('should return false on non oesd', done => {
    const hand = ['6d', 'Tc', '9c', '3c', '4h', '5c']
    assert(isOESD(hand) === true)
    done()
  })
  it('should return false on straight', done =>{
    const hand = ['6d', '5c', '4c', '3c', '4h', '5c']
    assert(isGutshot(hand) === false)
    done()
  })
  it('should return true on gutshot', done =>{
    const hand = ['6d', '4c', '3c', '2c', '4h', '9c']
    assert(isGutshot(hand) === true)
    done()
  })
  it('should return combos', done => {
    let subject = getCombosFromIndex(1)
    assert(subject.length === 4)
    done()
  })
  it('should create hands from board and combos', done => {
    const combo = ['8s', '8c']
    const combo2 = ['4s', '3s']
    const board = ['6d', '4c', '3c']
    let subject = combosToHands([combo, combo2], board)
    assert(subject[0].strength === 1)
    done()
  })
  it.only('process range', done =>{
    let subject = processRange([0,14], ['Ts', 'Ks', 'Jc', 'Qh'])
    console.log(subject[0])
    done()
  })
})