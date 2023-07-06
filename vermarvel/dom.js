// Exporting module: UI (DOM selectors)
const getEl = (s) => document.querySelector(s);

const dom = {
  // *****Variables**
  // Elements
  main: getEl("main"),
  parentMessages: getEl(".chat-screen"),
  tape: getEl(".chat-tape"),

  formMessage: getEl(".form-message"),
  formName: getEl(".form-nickname"),
  formAuthEmail: getEl(".form-email"),
  formConfirm: getEl(".form-confirm"),

  inputMessage: getEl("#input-message"),
  inputDialogEmail: getEl("#input-dialog-email"),
  inputDialogName: getEl("#input-dialog-name"),
  inputDialogConfirm: getEl("#input-dialog-confirm"),

  btnSend: getEl(".btn-send"),
  btnSubmitCode: getEl(".btn-submit-code"),
  btnSettings: getEl(".btn-settings"),

  templateUserMessage: getEl(".template-user-message"),
  templateOtherMessage: getEl(".template-other-message"),

  dialogAuth: getEl(".dialog-auth"),
  dialogConfirm: getEl(".dialog-confirm"),
  dialogSettings: getEl(".dialog-settings"),

  errorSettings: getEl(".error-settings"),
  errorAuth: getEl(".error-auth"),

  closeDialog(open = "") {
    this.dialogAuth.close();
    this.dialogSettings.close();
    this.dialogConfirm.close();

    if (open === "settings") {
      this.dialogSettings.showModal();
    }
    if (open === "auth") {
      this.dialogAuth.showModal();
    }
    if (open === "confirm") {
      this.dialogConfirm.showModal();
    }
    if (open === "") {
      return;
    }
  },

  //   displayConfirmationDelSet(set) {
  //     this.confirmation.value = set;
  //     this.confirmation.showModal();
  //   },
};

export default dom;
