function validateForm() {
    const input = document.getElementById('task1');
    if (input.value.trim() === '') {
        alert('Please enter a task.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}
