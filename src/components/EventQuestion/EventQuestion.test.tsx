import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import EventQuestion from './EventQuestion';
import EventAnswer from '../EventAnswer/EventAnswer';

const mockStore = configureMockStore([thunk]);

describe('EventQuestion', () => {
  const mockQuestion = {
    questionId: 1,
    text: 'who',
    answers: [
      { answerId: 1, text: 'you' },
      { answerId: 2, text: 'me' }
    ]
  };
  const store = mockStore({
    selectedEvent: {
      questions: [mockQuestion]
    }
  });
  const wrapper = mount(
    <Provider store={store}>
      <EventQuestion question={mockQuestion} />
    </Provider>
  );
  it('renders question header', () => {
    const h4 = wrapper.find('h4');
    const eventAnswer = wrapper.find(EventAnswer);
    expect(h4.text()).toBe(`${mockQuestion.questionId}. ${mockQuestion.text}`);
    expect(eventAnswer.length).toBe(2);
  });
});
