import { Router, Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import App from './App';
import Nav from '../Nav/Nav';

describe('App', () => {
  it('renders a Router, a Nav, and 4 Routes', () => {
    const app = shallow(<App />);
    const router = app.find(Router);
    const nav = app.find(Nav);
    const route = app.find(Route);
    expect(router.length).toEqual(1);
    expect(nav.length).toEqual(1);
    expect(route.length).toEqual(4);
  });
});
