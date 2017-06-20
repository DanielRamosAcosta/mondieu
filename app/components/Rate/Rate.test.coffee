import React from 'react'
import { shallow } from 'enzyme'

import Rate from './Rate.cjsx'

full = 'FaStar'
half = 'FaStarHalfEmpty'
empty = 'FaStarO'

describe 'Rate', ->
  describe 'si se le pasa una puntuación de', ->
    describe '5', ->
      it 'se muestran 5 estrellas llenas', ->
        wrapper = shallow <Rate value={5} />
        expect(wrapper.find full) .toHaveLength 5
        expect(wrapper.find half).toHaveLength 0
        expect(wrapper.find empty).toHaveLength 0
    describe '4.8', ->
      it 'se muestran 5 estrellas llenas', ->
        wrapper = shallow <Rate value={4.8} />
        expect(wrapper.find full).toHaveLength 5
        expect(wrapper.find half).toHaveLength 0
        expect(wrapper.find empty).toHaveLength 0
    describe '4.7', ->
      it 'se muestran 4 estrellas y media', ->
        wrapper = shallow <Rate value={4.7} />
        expect(wrapper.find full).toHaveLength 4
        expect(wrapper.find half).toHaveLength 1
        expect(wrapper.find empty).toHaveLength 0
    describe '4.3', ->
      it 'se muestran 4 estrellas y media', ->
        wrapper = shallow <Rate value={4.3} />
        expect(wrapper.find full).toHaveLength 4
        expect(wrapper.find half).toHaveLength 1
        expect(wrapper.find empty).toHaveLength 0
    describe '4.1', ->
      it 'se muestran 4 estrellas y una vacía', ->
        wrapper = shallow(<Rate value={4.1} />)
        expect(wrapper.find full).toHaveLength 4
        expect(wrapper.find half).toHaveLength 0
        expect(wrapper.find empty).toHaveLength 1
    describe '4', ->
      it 'se muestran 4 estrellas y una vacía', ->
        wrapper = shallow <Rate value={4} />
        expect(wrapper.find full).toHaveLength 4
        expect(wrapper.find half).toHaveLength 0
        expect(wrapper.find empty).toHaveLength 1
    describe '3.9', ->
      it 'se muestran 4 estrellas y una vacía', ->
        wrapper = shallow <Rate value={3.9} />
        expect(wrapper.find full).toHaveLength 4
        expect(wrapper.find half).toHaveLength 0
        expect(wrapper.find empty).toHaveLength 1
    describe '3.6', ->
      it 'se muestran 3 estrellas, una media y una vacía', ->
        wrapper = shallow <Rate value={3.6} />
        expect(wrapper.find full).toHaveLength 3
        expect(wrapper.find half).toHaveLength 1
        expect(wrapper.find empty).toHaveLength 1
    describe '3.1', ->
      it 'se muestran 3 estrellas, y dos vacías', ->
        wrapper = shallow <Rate value={3.1} />
        expect(wrapper.find full).toHaveLength 3
        expect(wrapper.find half).toHaveLength 0
        expect(wrapper.find empty).toHaveLength 2
    describe '1.5', ->
      it 'se muestra 1 estrella, una media, y tres vacías', ->
        wrapper = shallow <Rate value={1.5} />
        expect(wrapper.find full).toHaveLength 1
        expect(wrapper.find half).toHaveLength 1
        expect(wrapper.find empty).toHaveLength 3
    describe '0', ->
      it 'se muestran 5 estrallas vacías', ->
        wrapper = shallow <Rate value={0} />
        expect(wrapper.find full).toHaveLength 0
        expect(wrapper.find half).toHaveLength 0
        expect(wrapper.find empty).toHaveLength 5
