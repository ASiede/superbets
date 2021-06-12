describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders a div, a header, and a Nav', () => {
    const app = shallow(<App />);
    const div = app.find('div');
    const header = app.find('header');
    const nav = app.find(Nav);
    expect(div.length).toEqual(1);
    expect(header.length).toEqual(1);
    expect(nav.length).toEqual(1);
  });
});
