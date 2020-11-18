const { React, messages, channels } = require("powercord/webpack");
const {
  FormTitle,
  Button,
  Flex,
  Card,
  Text,
  Divider,
} = require("powercord/components");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");

const settings = powercord.api.settings.buildCategoryObject(
  "undertale-dialog-generator"
);
const getSetting = (setting, fallback) => settings.get(setting, fallback);

const {
  modes,
  boxes,
  colors,
  characters,
  expressions,
} = require("../options.json");

class CharacterLimitModal extends React.Component {
  constructor(props) {
    super(props);

    this.link = () =>
      `https://www.demirramon.com/utgen.png?text=${encodeURIComponent(
        props.message || "Input a message!"
      )}&box=${getSetting("box", boxes[0])}${
        getSetting("boxcolor", colors[0]) != colors[0]
          ? "&boxcolor=" + getSetting("boxcolor", colors[0])
          : ""
      }${
        getSetting("character", characters[0]) != characters[0]
          ? "&character=" + getSetting("character", characters[0])
          : ""
      }&expression=${getSetting("expression", expressions[0])}${
        getSetting("url", "") != "" &&
        getSetting("character", characters[0]) == "custom"
          ? "&url=" + encodeURIComponent(getSetting("url", ""))
          : ""
      }${
        getSetting("charcolor", colors[0]) != colors[0]
          ? "&charcolor=" + getSetting("charcolor", colors[0])
          : ""
      }${
        getSetting("mode", modes[0]) != ""
          ? "&mode=" + getSetting("mode", modes[0])
          : ""
      }`;
  }

  render() {
    return (
      <Modal className="powercord-text">
        <Modal.Header>
          <FormTitle tag="h4">Character Limit Reached</FormTitle>
        </Modal.Header>
        <Modal.Content>
          <Text>
            Undertale dialog boxes can only hold up to 71 characters, sorry!
            <br />
            If you choose to send anyway, your message will overflow out of the
            image.
          </Text>
        </Modal.Content>
        <Modal.Footer>
          <Button
            onClick={() => {
              messages.sendMessage(channels.getChannelId(), {
                content: this.link(),
              });
              closeModal();
            }}
          >
            Send Anyway
          </Button>
          <Button
            onClick={closeModal}
            look={Button.Looks.LINK}
            color={Button.Colors.TRANSPARENT}
          >
            Got It
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

module.exports = CharacterLimitModal;
