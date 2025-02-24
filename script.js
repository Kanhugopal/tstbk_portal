document.addEventListener('DOMContentLoaded', function() {
    // Attach event listener to the form submit button
    const form = document.getElementById('signupForm');
    const submitButton = form.querySelector('button');

    // Handle form submission
    submitButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData(form);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phoneNumber: formData.get('phoneNumber'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Validate if passwords match
        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Send POST request to Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbwWwyMoZ0n9GiIN3z3KZWG3N5WRmGTGtNAOUtiWFy3Wkr014IDH6euFq8oAcysPNui_/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === "success") {
                alert("Account created successfully!");
            } else {
                alert(result.message || "There was an error processing your request. Please try again.");
            }
        })
        .catch(error => {
            alert("There was an error: " + error.message);
        });
    });
});
