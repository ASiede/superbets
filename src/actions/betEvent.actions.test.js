import { SUPERBETS_API_BASE_URL } from '../config';
import {
  persistBetEvent,
  setPersistingBetEvent,
  resetNewBetEvent
} from './betEvent.actions';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('persistBetEvent', () => {
  it('returns and empty array', async () => {
    const mockUsername = 'pizzadilla';
    const mockName = 'SuperBowl 2020';
    const mockQuestions = [
      {
        questionId: 1,
        text: 'Who will win?',
        answers: [
          {
            answerId: 1,
            text: 'eagles',
            odds: 10,
            confirmed: false
          },
          {
            answerId: 2,
            text: 'seahawks',
            odds: 1.11,
            confirmed: false
          }
        ]
      },
      {
        questionId: 2,
        text: 'Coin Toss',
        answers: [
          {
            answerId: 1,
            text: 'heads',
            odds: 2,
            confirmed: false
          },
          {
            answerId: 2,
            text: 'tails',
            odds: 2,
            confirmed: false
          }
        ]
      }
    ];
    const mockNewBetEvent = {
      name: mockName,
      questions: mockQuestions
    };
    const dispatch = jest.fn();
    const getState = () => ({
      betEvents: {
        newBetEvent: mockNewBetEvent
      },
      user: { username: mockUsername }
    });
    await persistBetEvent()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setPersistingBetEvent(true));
    expect(fetch).toHaveBeenCalledWith(`${SUPERBETS_API_BASE_URL}/betevent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...mockNewBetEvent,
        createdBy: mockUsername,
        password: 'password'
      })
    });
    expect(dispatch).toHaveBeenCalledWith(setPersistingBetEvent(false));
    expect(dispatch).toHaveBeenCalledWith(resetNewBetEvent());
  });
});
