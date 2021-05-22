export const snackbar = (type, text = 'Error', sticky = true) => [
  {
    severity: type,
    summary: text,
    sticky
  }
];
