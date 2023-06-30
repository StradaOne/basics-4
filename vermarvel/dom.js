// Exporting module: UI (DOM selectors)
const getEl = (s) => document.querySelector(s);

const dom = {
  // *****Variables**
  // Elements
  formMessage: getEl(".form-message"),
  formName: getEl(".form-nickname"),
  formEmail: getEl(".form-email"),
  inputMessage: getEl("#input-message"),
  inputDialogEmail: getEl("#input-dialog-email"),
  inputDialogName: getEl("#input-dialog-name"),
  inputDialogConfirm: getEl("#input-dialog-confirm"),
  btnSend: getEl(".btn-send"),
  btnSubmitCode: getEl(".btn-submit-code"),
  templateUserMessage: getEl(".template-user-message"),
  templateOtherMessage: getEl(".template-other-message"),
  parentMessages: getEl(".chat-screen"),
  dialogAuth: getEl(".dialog-auth"),
  dialogConfirm: getEl(".dialog-confirm"),
  dialogSettings: getEl(".dialog-settings"),

  //   parentSets: getEl(".sets-container"),
  //   setTemplate: getEl(".set-template"),
  //   formEditTemplate: getEl(".form-edit-template"),
  //   dropdown: getEl("#dropdown"),
  //   leftBox: getEl(".left-box"),
  //   leftBoxAlt: getEl(".left-box-alternative"),
  //   rightBox: getEl(".right-box"),
  //   addCardForm: getEl(".create-new-form"),
  //   cardBody: getEl(".card-body"),
  //   body: getEl("body"),
  //   textBox: document.querySelectorAll(".text-box"),
  //   flipRight: getEl(".arrow-right"),
  //   flipLeft: getEl(".arrow-left"),
  //   iconFlipRight: getEl(".icon-right"),
  //   iconFlipLeft: getEl(".icon-left"),

  //   // Submit
  //   inputQ: getEl(".q"),
  //   inputA: getEl(".a"),
  //   inputSet: getEl(".set-name"),
  //   btnCancelEdits: getEl(".btn-cancel-edits"),

  //   // Notifications
  //   confirmation: getEl(".confirmation"),
  //   noticeDialog: getEl(".notice-dialog"),

  //   // Functions
  //   displayNotice(str) {
  //     const text = this.noticeDialog.querySelector("p");
  //     text.textContent = str;
  //     this.noticeDialog.showModal();
  //   },

  closeDialog(open = "") {
    console.log(open);
    console.log(this.dialogAuth);
    console.log(this.dialogSettings);
    console.log(this.dialogConfirm);

    this.dialogAuth.close();
    this.dialogSettings.close();
    this.dialogConfirm.close();

    if (open === "settings") {
      console.log("Opening settings dialog");
      this.dialogSettings.showModal();
    }
    if (open === "auth") {
      console.log("Opening auth dialog");
      this.dialogAuth.showModal();
    }
    if (open === "confirm") {
      console.log("Opening confirm dialog");
      this.dialogConfirm.showModal();
    }
    if (open === "") {
      console.log("No dialog to open");
      return;
    }
  },

  //   displayConfirmationDelSet(set) {
  //     this.confirmation.value = set;
  //     this.confirmation.showModal();
  //   },
};

export default dom;
