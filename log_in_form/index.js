document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Remove existing error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(errorMessage => errorMessage.remove());

        v// Collect form data
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate mobile number
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobile)) {
            displayErrorMessage('mobile', '&#10060; Incorrect mobile number.');
            return;
        }

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            displayErrorMessage('password', '&#10060; Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('&#10060; Passwords do not match.');
            return;
        }

        console.log('Name:', name);
        console.log('Mobile:', mobile);
        console.log('Email:', email);
        console.log('Password:', password);

        // Send form data via EmailJS
        emailjs.send('service_8xhtil5', 'template_1tv502k', {
                name: name,
                mobile: mobile,
                email: email,
                password: password,
            })
            .then((response) => {
                alert('✅ Successfully signed up!');
                form.reset();
                window.location.href = 'https://indianrestarent.ccbp.tech/'; // Redirect after successful signup
            })
            .catch((error) => {
                alert('&#10060; Failed to send the form. Please try again later.');
                console.error('EmailJS error:', error);
            });
    });
});

// Initialize EmailJS
(function() {
    emailjs.init('5u82gL5q-s8cy21_Y');
})();

function displayErrorMessage(inputId, message) {
    const inputField = document.getElementById(inputId);
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = message;
    errorMessage.style.color = 'red';
    errorMessage.classList.add('error-message');
    errorMessage.style.marginTop = '5px';

    // Append the error message under the input field
    inputField.parentNode.insertBefore(errorMessage, inputField.nextSibling);
}