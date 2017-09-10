window.addEventListener('DOMContentLoaded', () => {
    // Success notification
    const successNotification = createNotification({
        hideDuration: 4000,
        onclick: (e) => alert(e),
        closeButton: true
    });

    const successButton = document.querySelector('#successNotification');
    successButton.addEventListener('click', () => successNotification('Success notification...'));
});