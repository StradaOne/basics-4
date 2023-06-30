export function modalSwitcher(hideModal, showModal) {
	return () => {
		hideModal.close();
		showModal.showModal();
	};
}

export function modalCloser(modal) {
	return () => {
		modal.close();
	};
}

export function preventDefaultAction(event) {
	event.preventDefault();
}
