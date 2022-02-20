export const createSnackbar = (
  type: any,
  text: any = 'Error',
  sticky = true
) => [
  {
    severity: type,
    summary: text,
    sticky
  }
];
