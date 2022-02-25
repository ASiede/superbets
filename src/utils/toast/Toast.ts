export const createToast = (type: any, text: any = 'Error', sticky = true) => [
  {
    severity: type,
    summary: text,
    sticky
  }
];
