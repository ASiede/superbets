import React from 'react';
// import { render } from '@testing-library/react';
// import expect from 'expect';
import { shallow } from 'enzyme';
import { App } from './App';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});


// describe('App', () => {
//   it('renders a dev', () => {
//     const app = shallow(<App />);
//     const div = app.find('div');
//     expect(div.length).toEqual(1);
//   });
// });
