export const createSnackbar = (type, text = 'Error', sticky = true) => [
  {
    severity: type,
    summary: text,
    sticky
  }
];
