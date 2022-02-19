import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import mockedStore from '../../__mocks__/mockedStore';
import { selectAnswer } from '../../actions';
import EventAnswer, { getAnswerColor } from './EventAnswer';
import { EventAnswerType, EventMode, EventQuestionType } from '../../Types';

const mockStore = configureMockStore([thunk]);
const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const original = jest.requireActual('react-redux');
  return {
    ...original,
    useDispatch: () => mockDispatch
  };
});

jest.mock('../../actions');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('EventAnswer', () => {
  it('dispatches handleSelectAnswer when div is clicked', () => {
    const store = mockStore({ ...mockedStore, eventMode: EventMode.CONFIRM });
    const answer: EventAnswerType = { answerId: 1, text: 'blue' };
    const question: EventQuestionType = {
      questionId: 1,
      text: 'color',
      answers: []
    };
    const wrapper: any = mount(
      <Provider store={store}>
        <EventAnswer answer={answer} question={question} />
      </Provider>
    );
    wrapper.find('div').at(2).props().onClick();
    expect(mockDispatch).toBeCalledWith(selectAnswer());
  });

  describe('getAnswerColor', () => {
    it('returns the correct string', () => {
      const answer = { confirmed: true };
      const mode = EventMode.CONFIRM;
      const result = getAnswerColor(answer, mode);
      const expected = 'answer gold-bg mediumblue-border';
      expect(result).toBe(expected);
    });
    it('returns the correct string', () => {
      const answer = { confirmed: false };
      const mode = EventMode.CONFIRM;
      const result = getAnswerColor(answer, mode);
      const expected = 'answer black-bg mediumblue-border';
      expect(result).toBe(expected);
    });
    it('returns the correct string', () => {
      const answer = { guessed: true };
      const mode = EventMode.GUESS;
      const result = getAnswerColor(answer, mode);
      const expected = 'guess green-bg mediumblue-border';
      expect(result).toBe(expected);
    });
    it('returns the correct string', () => {
      const answer = { guessed: false };
      const mode = EventMode.GUESS;
      const result = getAnswerColor(answer, mode);
      const expected = 'guess black-bg mediumblue-border';
      expect(result).toBe(expected);
    });
  });
});
