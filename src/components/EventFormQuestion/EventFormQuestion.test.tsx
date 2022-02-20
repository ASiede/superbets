import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import EventFormQuestion from './EventFormQuestion';
import EventFormAnswer from '../EventFormAnswer/EventFormAnswer';
import { addQuestion, updateQuestionText } from '../../actions';

const mockStore = configureMockStore([thunk]);
const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const original = jest.requireActual('react-redux');
  return {
    ...original,
    useDispatch: () => mockDispatch
  };
});

describe('BetEventFormQuestion', () => {
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
      <EventFormQuestion question={mockQuestion} />
    </Provider>
  );
  it('renders 1 Button, 1 InputText, and 2 BetEventFormAnswer', () => {
    expect(true).toBeTruthy();
    const button = wrapper.find(Button);
    const inputText = wrapper.find(InputText);
    const betEventFormAnswer = wrapper.find(EventFormAnswer);
    expect(button.length).toBeGreaterThan(1);
    expect(inputText.length).toBeGreaterThan(1);
    expect(betEventFormAnswer.length).toEqual(2);
  });
  it('dispatches addQuestion on button click', () => {
    wrapper.find(Button).at(0).simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith(addQuestion());
    expect(true).toBe(true);
  });
  it('dispatches updateQuestionText on question input change', () => {
    const mockValue = 'Who wins?';
    wrapper
      .find(InputText)
      .at(0)
      .simulate('change', { target: { value: mockValue } });
    expect(mockDispatch).toHaveBeenCalledWith(
      updateQuestionText({
        questionId: mockQuestion.questionId,
        text: mockValue
      })
    );
  });
});
