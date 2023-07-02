export function modalSwitcher(hideModal, showModal) {
	return () => {
		hideModal.close();
		showModal.showModal();
	};
}
