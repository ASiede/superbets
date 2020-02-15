import React from 'react';
// import { render } from '@testing-library/react';
// import expect from 'expect';
import { shallow } from 'enzyme';
import { App, mapStateToProps } from './App';
import Nav from './components/Nav/Nav';

describe('App', () => {
//   it('renders without crashing', () => {
//     shallow(<App />);
//   });

//   it('renders a div, a header, and a Nav', () => {
//     const app = shallow(<App />);
//     const div = app.find('div');
//     const header = app.find('header');
//     const nav = app.find(Nav);
//     expect(div.length).toEqual(1);
//     expect(header.length).toEqual(1);
//     expect(nav.length).toEqual(1);
//   });

  describe('mapStateToProps', () => {
    it('maps state to props', () => {
      const mockState = {
        superbetsState: { currentTab: 'HOME'}
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps.currentTab).toEqual('HOME');
    });
  });

});

