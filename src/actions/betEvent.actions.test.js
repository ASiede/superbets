import { persistBetEvent, baseUrl } from './betEvent.actions';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('persistBetEvent', () => {
  it('returns and empty array', async () => {
    const dispatch = jest.fn();
    const variables = {
      name: 'SuperBowl 2020',
      password: 'shh',
      'q0': 'Who will win?',
      'q0:a0': 'eagles',
      'q0:a0:odds': 10,
      'q0:a1': 'seahawks',
      'q0:a1:odds': 1.11,
      'q1': 'Coin Toss',
      'q1:a0': 'heads',
      'q1:a0:odds': 2,
      'q1:a1': 'tails',
      'q1:a1:odds': 2,
    };
    const parsedBody = {
      name: 'SuperBowl 2020',
      password: 'shh',
      questions: [{
        questionId: 1,
        text: 'Who will win?',
        answers: [{
          answerId: 1,
          text: 'eagles',
          odds: 10,
          confirmed: false
        }, {
          answerId: 2,
          text: 'seahawks',
          odds: 1.11,
          confirmed: false
        }]
      },{
        questionId: 2,
        text: 'Coin Toss',
        answers: [{
          answerId: 1,
          text: 'heads',
          odds: 2,
          confirmed: false
        }, {
          answerId: 2,
          text: 'tails',
          odds: 2,
          confirmed: false
        }]
      }]
    };

    await persistBetEvent(variables)(dispatch);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedBody)
    });
  });
});