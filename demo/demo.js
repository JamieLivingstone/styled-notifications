'use strict';

// Written using ES5 JS for browser support
window.addEventListener('DOMContentLoaded', function () {
	// Success notification example
	var successNotification = window.createNotification({
		closeOnClick: false,
		showDuration: 2000,
		displayCloseButton: true,
		className: 'success'
	});

	var successButton = document.querySelector('#successNotification');

	successButton.addEventListener('click', function () {
		successNotification({ message: 'Updated profile successfully!'});
	});
});