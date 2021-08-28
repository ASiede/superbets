export const mockedStore = {
  user: {
    loggedIn: false,
    logInInProgress: false
  },
  betEvents: {
    newBetEvent: {
      name: '',
      questions: [
        {
          questionId: 1,
          text: '',
          answers: [
            { answerId: 1, text: '', odds: undefined, confirmed: false }
          ]
        }
      ]
    }
  }
};

export default mockedStore;
