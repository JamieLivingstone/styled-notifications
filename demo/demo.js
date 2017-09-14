'use strict';

// Written using ES5 JS for browser support
window.addEventListener('DOMContentLoaded', function () {
	// Success notification example
	var successNotification = window.createNotification({
		closeOnClick: true,
		showDuration: 300000,
		displayCloseButton: true,
		theme: 'info',
		positionClass: 'nfc-top-left',
	});

	var successButton = document.querySelector('#successNotification');

	successButton.addEventListener('click', function () {
		successNotification({ title: 'Success', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tellus dui, placerat vitae sagittis ac, imperdiet in lorem. Integer fringilla malesuada condimentum. Donec lacus nibh, dictum nec neque a, dignissim sollicitudin tortor. Donec ut mi nisi. Curabitur egestas blandit vulputate. Pellentesque id metus mollis, cursus lectus vitae, pharetra est. Donec tortor urna, condimentum sit amet diam venenatis, rutrum tempus eros. Donec pretium orci in scelerisque aliquam. Sed pharetra ultrices iaculis. Vestibulum et consectetur neque. Praesent auctor nulla sed massa euismod consectetur. Vivamus scelerisque scelerisque lacus, nec aliquam mauris rhoncus nec. Ut a elit viverra, mollis metus ac, pharetra diam.'});
	});
});