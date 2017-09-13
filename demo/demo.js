'use strict';

// Written using ES5 JS for browser support
window.addEventListener('DOMContentLoaded', function () {
	// Success notification example
	var successNotification = window.createNotification({
		closeOnClick: true,
		showDuration: 3000,
		displayCloseButton: true
	});

	var successButton = document.querySelector('#successNotification');

	successButton.addEventListener('click', function () {
		successNotification({ message: 'Updated profile successfully!'});
	});
});