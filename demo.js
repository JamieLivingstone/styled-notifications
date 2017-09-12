window.addEventListener('DOMContentLoaded', () => {
	// Success notification
	const successNotification = window.createNotification({
		hideDuration: 4000,
		newestOnTop: true,
		onclick: (e) => alert(e),
		closeButton: true
	});

	const successButton = document.querySelector('#successNotification');
	successButton.addEventListener('click', () => successNotification('Success notification...'));
});