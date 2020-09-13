const { React } = require("powercord/webpack");
const { FormTitle, Button } = require("powercord/components");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");

const { clipboard } = require("electron");

module.exports = (settings) => (
  <Modal className="powercord-text">
    <Modal.Header>
      <FormTitle tag="h4">Undertale Dialog Generator</FormTitle>
      <Modal.CloseButton onClick={closeModal} />
    </Modal.Header>
    <Modal.Content>Coming soon!</Modal.Content>
    <Modal.Footer>
      <Button
        onClick={() => {
          clipboard.writeText("Sorry, this feature isn't done yet!");
          closeModal();
        }}
      >
        Generate
      </Button>
      <Button
        onClick={closeModal}
        look={Button.Looks.LINK}
        color={Button.Colors.TRANSPARENT}
      >
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);
