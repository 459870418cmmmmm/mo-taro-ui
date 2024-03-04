import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import Drawer from '../index';

configure({adapter: new Adapter()});
describe('Test Drawer', () => {
  test('Test Drawer function', () => {
    const props = {className: 'drawer', isOpen: true};
    const wrapper = shallow(<Drawer {...props}>test</Drawer>);
    expect(wrapper.find('div.fps-drawer').length).toBe(1);
  });
});
