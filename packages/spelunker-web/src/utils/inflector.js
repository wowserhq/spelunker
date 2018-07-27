/* eslint-disable import/prefer-default-export */

export const humanize = (str) => {
  str = str.replace(/_| /, ' ');
  str = str.toLowerCase();
  str = str.replace(/^\w/, (match) => match.toUpperCase());
  return str;
};
