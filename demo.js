window.addEventListener('DOMContentLoaded', () => {
	// Generate a dummy message
	function generateMessage(messagesArray = ['Logged in successfully!', 'Saved data', 'Uploading video with some dummy text', 'Congratulations', 'Failed to upload']) {
		const index = Math.round(Math.random() * (messagesArray.length - 1));
		return messagesArray[index];
	}

	// Success notification
	const successNotification = window.createNotification({
		hideDuration: 4000,
		newestOnTop: true,
		onclick: (e) => alert(e),
		closeButton: true,
		className: 'success'
	});

	const successButton = document.querySelector('#successNotification');
	successButton.addEventListener('click', () => successNotification(generateMessage()));
});