// numberFormatter.js
export function formatNumberForDisplay(number) {
    return new Intl.NumberFormat('id-ID').format(number);
  }
  
  export function prepareNumberForAPI(numberString) {
    // Remove any formatting and convert to integer
    return parseInt(numberString.split('.').join(''), 10);
  }
  