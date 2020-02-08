import React from 'react';
// import { render } from '@testing-library/react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders a div', () => {
    const app = shallow(<Nav />);
    const nav = app.find('nav');
    expect(nav.length).toEqual(1);
  });
});
