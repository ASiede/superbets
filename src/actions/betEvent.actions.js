
export const baseUrl = 'https://cors-anywhere.herokuapp.com/https://superbets-api.herokuapp.com/betevent/';

export const persistBetEvent = (variables) => async(dispatch) => {
  const questionKeys = Object.keys(variables).reduce((acc, cur) => {
    if (cur.includes('q') && !cur.includes(':')) {
      acc.push(cur);
    }
    return acc;
  }, []);
  const numberOfQuestions = questionKeys.length;
  const questions = [];
  for (let i=0; i < numberOfQuestions; i++) {
    const answers = Object.keys(variables).reduce((acc, cur) => {
      if (cur.includes(`q${i}:a`) && !cur.includes('odds')) {
        acc.push({
          answerId: parseInt(cur.split(':')[1].substring(1)) + 1,
          text: variables[cur],
          odds: variables[`${cur}:odds`],
          confirmed: false
        });
      }
      return acc;
    }, []);
    questions.push({
      questionId: i + 1,
      text: variables[`q${i}`],
      answers
    });
  }
  const body = {
    name: variables.name,
    password: variables.password,
    questions: questions
  };
  // return body;
  const response = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  // const newResponse = await response.json();
  // console.log('POSTING BET EVENT', newResponse);
  // TODO: on success and on failter
};