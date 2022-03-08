export const mockedStore = {
  user: {
    loggedIn: false,
    logInInProgress: false
  },
  selectedEvent: {
    event: {
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
