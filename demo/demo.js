'use strict';

// Written using ES5 JS for browser support
window.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('form');

	form.addEventListener('submit', e => {
		e.preventDefault();

		// Form elements
		const title = form.querySelector('#title').value;
		let message = form.querySelector('#message').value;
		const position = form.querySelector('#position').value;
		const duration = form.querySelector('#duration').value;
		const theme = form.querySelector('#theme').value;
		const closeOnClick = form.querySelector('#close').checked;
		const displayClose = form.querySelector('#closeButton').checked;

		if (!message) {
			message = 'You did not enter a message...';
		}

		//create the text version of the command for displaying
		document.getElementById('cmdoutput').innerHTML = `
		<label> JS Command used to create this notification:</label>
		<hr>
<pre>
window.createNotification({
	closeOnClick: ${closeOnClick},
	displayCloseButton: ${displayClose},
	positionClass: ${position},
	showDuration: Number(${duration}),
	theme: ${theme}
})({
	title: ${title},
	message: ${message}
});
</pre>
		`;

		//create the notification
		window.createNotification({
			closeOnClick: closeOnClick,
			displayCloseButton: displayClose,
			positionClass: position,
			showDuration: Number(duration),
			theme: theme
		})({
			title: title,
			message: message
		});
	});
});
