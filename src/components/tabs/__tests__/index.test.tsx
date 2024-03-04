import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import Tabs from '../index';

configure({adapter: new Adapter()});
describe('Test Drawer', () => {
  test('Test Drawer function', () => {
    const props = {className: 'tabs'};
    const wrapper = shallow(
      <Tabs {...props}>
        <Tabs.Tab title="demo" key="demo-id">
          123
        </Tabs.Tab>
      </Tabs>
    );
    expect(wrapper.find('div.fps-tabs').length).toBe(1);
  });
});
