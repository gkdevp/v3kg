    // utils/toastError.js
    
    export function showToast(message, type = '', containerId = '') { 
        const toastElement = document.getElementById(containerId);
        const toastMessageElement = toastElement.querySelector('span');
        
        // Reset classes
        toastElement.classList.remove('force-red', 'force-green');

        // Depending on type, add the appropriate background class
        if (type === 'success') {
            toastElement.classList.add('force-green');
        } else if (type === 'error') {
            toastElement.classList.add('force-red');
        }

        toastMessageElement.innerText = message;
        toastElement.classList.remove('hidden');

        // Separate durations for success and error
        const successDuration = 2000;  // 2 seconds for success
        const errorDuration = 9000;   // 90 seconds for error

        // Set duration based on type
        const duration = (type === 'success') ? successDuration : errorDuration;

        // Automatically hide the toast after the duration
        return setTimeout(() => {
            toastElement.classList.add('hidden');
        }, duration);

    }

