import { TOAST_TYPES } from '../components/constants';
import { SUPERBETS_API_BASE_URL } from '../config';
import { createToast } from '../utils/toast/Toast';
import { persistNewEvent, setPersistingBetEvent } from './betEvent.actions';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('persistNewEvent', () => {
  it('POSTs a bet event', async () => {
    const mockShow = jest.fn();
    const toast = { current: { show: mockShow } };
    const mockId = '123';
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
      selectedEvent: mockNewBetEvent,
      user: { id: mockId },
      toast
    });
    fetch.mockResolvedValueOnce({
      status: 201,
      json: () => ({ name: mockName })
    });
    await persistNewEvent()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setPersistingBetEvent(true));
    expect(fetch).toHaveBeenCalledWith(`${SUPERBETS_API_BASE_URL}/betevent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...mockNewBetEvent,
        createdBy: mockId
      })
    });
    expect(dispatch).toHaveBeenCalledWith(setPersistingBetEvent(false));
    expect(mockShow).toHaveBeenCalledWith(
      createToast(TOAST_TYPES.SUCCESS, `${mockName} has been created`)
    );
  });
  it('calls createToast with an error message from the POST', async () => {
    const mockShow = jest.fn();
    const toast = { current: { show: mockShow } };
    const mockId = '123';
    const dispatch = jest.fn();
    const mockMessage = 'Name already used';
    const getState = () => ({
      selectedEvent: {},
      user: { id: mockId },
      toast
    });
    fetch.mockResolvedValueOnce({
      status: 400,
      json: () => ({
        message: mockMessage
      })
    });
    await persistNewEvent()(dispatch, getState);
    expect(mockShow).toHaveBeenCalledWith(
      createToast(TOAST_TYPES.ERROR, mockMessage)
    );
    expect(dispatch).toHaveBeenCalledWith(setPersistingBetEvent(true));
    expect(dispatch).toHaveBeenCalledWith(setPersistingBetEvent(false));
  });
  it('calls createToast with an error from the POST', async () => {
    const mockShow = jest.fn();
    const toast = { current: { show: mockShow } };
    const mockId = '123';
    const dispatch = jest.fn();
    const mockErrorMessage = 'Uh Oh';
    const getState = () => ({
      selectedEvent: {},
      user: { id: mockId },
      toast
    });
    fetch.mockRejectedValueOnce(new Error(mockErrorMessage));
    await persistNewEvent()(dispatch, getState);
    expect(mockShow).toHaveBeenCalledWith(
      createToast(TOAST_TYPES.ERROR, mockErrorMessage)
    );
    expect(dispatch).toHaveBeenCalledWith(setPersistingBetEvent(true));
    expect(dispatch).toHaveBeenCalledWith(setPersistingBetEvent(false));
  });
});
