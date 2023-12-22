// utils/formatGeneralError.js
function formatGeneralError(error) {
    if (error.name !== 'GeneralError') {
        // Handle or return something for non-GeneralError if necessary
        return 'An unknown error occurred.';
    }

    let trimmedErrorCode = String(error.code).slice(3); // Trim off the first three characters
    let errorMessage = `Error Code: ${trimmedErrorCode}\n`;
    errorMessage += `Error Message: ${error.message}\n`;

    if (error.messages) {
        errorMessage += '\n'; // Added an extra newline for spacing

        // Assuming error.messages is an object where each key has an array of messages
        for (let [key, valueArray] of Object.entries(error.messages)) {
            errorMessage += `${key} :\n\n`; // Added an extra newline for spacing
            valueArray.forEach((detail, index) => {
                errorMessage += `${index + 1}. ${detail}\n`;
            });
            errorMessage += '\n'; // Added a newline between different keys
        }
    }
    return errorMessage;
}