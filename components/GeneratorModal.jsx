const { React, messages, channels } = require("powercord/webpack");
const { clipboard } = require("electron");
const { FormTitle, Button, Flex } = require("powercord/components");
const { SelectInput, TextAreaInput } = require("powercord/components/settings");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");

const settings = powercord.api.settings.buildCategoryObject(
  "undertale-dialog-generator"
);
const getSetting = (setting, fallback) => settings.get(setting, fallback);
const updateSetting = (setting, value) => settings.set(setting, value);

const {
  modes,
  boxes,
  boxColors,
  characters,
  expressions,
} = require("../options.json");

class GeneratorModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updater: false,
    };

    this.link = () =>
      `https://www.demirramon.com/utgen.png?text=${encodeURIComponent(
        getSetting("message", "Input a message!") || "Input a message!"
      )}&box=${getSetting("box", boxes[0])}&boxcolor=${getSetting(
        "boxcolor",
        boxColors[0]
      )}${
        getSetting("character", characters[0]) != ""
          ? "&character=" + getSetting("character", characters[0])
          : ""
      }&expression=${getSetting("expression", expressions[0])}${
        getSetting("url", "") != "" &&
        getSetting("character", characters[0]) == "custom"
          ? "&url=" + encodeURIComponent(getSetting("url", ""))
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
          <FormTitle tag="h4">Undertale Dialog Generator</FormTitle>
        </Modal.Header>
        <Modal.Content>
          <Flex>
            <Flex.Child>
              <div>
                <SelectInput
                  options={[
                    { label: "Regular", value: 0 },
                    { label: "Dark World (Deltarune)", value: 1 },
                  ]}
                  value={modes.indexOf(getSetting("mode", modes[0]))}
                  onChange={(o) => {
                    updateSetting("mode", modes[o.value]);
                    this.setState({ updater: !this.state.updater });
                  }}
                >
                  Mode
                </SelectInput>
              </div>
            </Flex.Child>
            <Flex.Child>
              <div>
                <SelectInput
                  options={[
                    { label: "Original Box", value: 0 },
                    { label: "Deltarune", value: 1 },
                    { label: "Earthbound", value: 2 },
                    { label: "TS!Underswap", value: 3 },
                    { label: "Primus Underfell", value: 4 },
                    { label: "Octagonal", value: 5 },
                    { label: "Shaded Ground", value: 6 },
                    { label: "Classic TuberTale", value: 7 },
                    { label: "FNAStale", value: 8 },
                    { label: "Derp", value: 9 },
                  ]}
                  value={boxes.indexOf(getSetting("box", boxes[0]))}
                  onChange={(o) => {
                    updateSetting("box", boxes[o.value]);
                    this.setState({ updater: !this.state.updater });
                  }}
                >
                  Text Box
                </SelectInput>
              </div>
            </Flex.Child>
            <Flex.Child>
              <div>
                <SelectInput
                  options={[
                    { label: "White", value: 0 },
                    { label: "Red", value: 1 },
                    { label: "Orange", value: 2 },
                    { label: "Yellow", value: 3 },
                    { label: "Lime", value: 4 },
                  ]}
                  value={boxColors.indexOf(
                    getSetting("boxcolor", boxColors[0])
                  )}
                  onChange={(o) => {
                    updateSetting("boxcolor", boxColors[o.value]);
                    this.setState({ updater: !this.state.updater });
                  }}
                >
                  Box Color
                </SelectInput>
              </div>
            </Flex.Child>
          </Flex>
          <Flex>
            <Flex.Child>
              <div>
                <SelectInput
                  options={[
                    { label: "None / Custom", value: 0 },
                    { label: "Undertale", value: 1 },
                    { label: "Deltarune", value: 2 },
                    { label: "Underswap", value: 3 },
                    { label: "Underfell", value: 4 },
                    { label: "Disbelief", value: 5 },
                    { label: "Sudden Changes", value: 6 },
                    { label: "Monster Friends", value: 7 },
                    { label: "Broken Memories", value: 8 },
                    { label: "Name The Fallen", value: 9 },
                    { label: "Remembrance", value: 10 },
                    { label: "Crossovers", value: 11 },
                    { label: "Extras", value: 12 },
                  ]}
                  value={getSetting("universe", 0)}
                  onChange={(o) => {
                    updateSetting("universe", o.value);
                    this.setState({ updater: !this.state.updater });
                  }}
                >
                  Universe
                </SelectInput>
              </div>
            </Flex.Child>
          </Flex>
          <Flex>
            {getSetting("universe", 0) == 0 && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      {
                        label: "No Character",
                        value: 0,
                      },
                      { label: "Empty Space", value: 1 },
                      { label: "Use URL", value: 2 },
                    ]}
                    value={characters.indexOf(
                      getSetting("character", characters[0])
                    )}
                    onChange={(o) => {
                      updateSetting("character", characters[o.value]);
                      updateSetting("expression", expressions[0]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Character
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("universe", 0) == 1 && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Frisk", value: 3 },
                      { label: "Flowey", value: 4 },
                      { label: "Toriel", value: 5 },
                      { label: "Training Dummy", value: 6 },
                      { label: "Napstablook", value: 7 },
                      { label: "Sans", value: 8 },
                      { label: "Papyrus", value: 9 },
                      { label: "Grillby", value: 10 },
                      { label: "Monster Kid", value: 11 },
                      { label: "Mad Dummy", value: 12 },
                      { label: "Undyne", value: 13 },
                      { label: "Undyne the Undying", value: 14 },
                      { label: "Temmie", value: 15 },
                      { label: "Alphys", value: 16 },
                      { label: "Mettaton", value: 17 },
                      { label: "Muffet", value: 18 },
                      { label: "Mettaton EX", value: 19 },
                      { label: "Mettaton NEO", value: 20 },
                      { label: "Asgore", value: 21 },
                      { label: "Omega Flowey", value: 22 },
                      { label: "Asriel", value: 23 },
                      { label: "Asriel (God of Hyperdeath)", value: 24 },
                      { label: "Asriel (Final Form)", value: 25 },
                      { label: "Chara", value: 26 },
                      { label: "🕈📬👎📬 ☝✌💧❄☜☼", value: 27 },
                    ]}
                    value={characters.indexOf(
                      getSetting("character", characters[3])
                    )}
                    onChange={(o) => {
                      updateSetting("character", characters[o.value]);
                      updateSetting("expression", expressions[0]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Character
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {/* EXPRESSIONS */}
            {getSetting("character", characters[0]) == "undertale-flowey" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Winking", value: 1 },
                      { label: "Looking Away", value: 2 },
                      { label: "Raised Eyebrows", value: 3 },
                      { label: "Closed Eyes", value: 4 },
                      { label: "Sassy", value: 5 },
                      { label: "Mad", value: 6 },
                      { label: "Angry", value: 7 },
                      { label: "Angrier", value: 8 },
                      { label: "Evil", value: 9 },
                      { label: "Grinning", value: 10 },
                      { label: "Laughing", value: 11 },
                      { label: "Jaws", value: 12 },
                      { label: "Skull", value: 13 },
                      { label: "Shocked", value: 14 },
                      { label: "Shocked 2", value: 15 },
                      { label: "Disappointed", value: 16 },
                      { label: "Hurt", value: 17 },
                      { label: "Hurt 2", value: 18 },
                      { label: "Scared", value: 19 },
                      { label: "Sweating", value: 20 },
                      { label: "Terrified", value: 21 },
                      { label: "Sad", value: 22 },
                      { label: "Sad, Looking Away", value: 23 },
                      { label: "Sad, Looking Down", value: 24 },
                      { label: "Sad, Eyes Closed", value: 25 },
                      { label: "Wilted", value: 26 },
                      { label: "Wilted, Standing Up", value: 27 },
                      { label: "Crazy", value: 28 },
                      { label: "Empty", value: 29 },
                      { label: "Cool", value: 30 },
                      { label: "Cute", value: 31 },
                      { label: "Googly Eyes", value: 32 },
                      { label: "Money", value: 33 },
                      { label: "Toriel Face", value: 34 },
                      { label: "Creepy Toriel Face", value: 35 },
                      { label: "Asgore Face", value: 36 },
                      { label: "Creepy Asgore Face", value: 37 },
                      { label: "Asriel Face", value: 38 },
                      { label: "Crying Asriel Face", value: 39 },
                      { label: "Frisk Face", value: 40 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("character", characters[0]) == "undertale-toriel" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Looking Away", value: 2 },
                      { label: "Eyes Semi-Closed", value: 41 },
                      { label: "Eyes Closed", value: 4 },
                      { label: "Happy", value: 42 },
                      { label: "Sad Smile", value: 43 },
                      { label: "Sad", value: 22 },
                      { label: "Eyes Semi-Closed, Sad", value: 44 },
                      { label: "Eyes Closed, Sad", value: 45 },
                      { label: "Eyes Closed, Sad 2", value: 46 },
                      { label: "Eyes Closed, Sad 3", value: 47 },
                      { label: "Eyes Closed, Sad 4", value: 48 },
                      { label: "Eyes Closed, Sad 5", value: 49 },
                      { label: "Eyes Closed, Sad 6", value: 50 },
                      { label: "Looking Away, Sad", value: 23 },
                      { label: "Looking Away, Sad 2", value: 51 },
                      { label: "Eyes Closed, Smiling, Sad", value: 52 },
                      { label: "Blushing", value: 53 },
                      { label: "Surprised", value: 54 },
                      { label: "Shocked", value: 14 },
                      { label: "Crazy 1", value: 28 },
                      { label: "Crazy 2", value: 55 },
                      { label: "Crazy 3", value: 56 },
                      { label: "Eyes Semi-Closed, Happy", value: 57 },
                      { label: "Eyes Closed, Happy", value: 58 },
                      { label: "Disbelief", value: 59 },
                      { label: "Disbelief, Looking Away", value: 60 },
                      { label: "Incredulous", value: 61 },
                      { label: "Incredulous, Looking Away", value: 62 },
                      { label: "Annoyed", value: 63 },
                      { label: "Annoyed 2", value: 64 },
                      { label: "Serious", value: 65 },
                      { label: "Serious, Talking", value: 66 },
                      { label: "Serious, Looking Away", value: 67 },
                      { label: "Pissed", value: 68 },
                      { label: "Glasses", value: 69 },
                      { label: "Glasses, Happy", value: 70 },
                      { label: "Glasses, Eyes Semi-Closed", value: 71 },
                      { label: "Glasses, Looking Away", value: 72 },
                      { label: "Glasses, Eyes Closed", value: 73 },
                      { label: "Glasses, Pissed", value: 74 },
                      { label: "Hurt", value: 17 },
                      { label: "Hurt, Laughing", value: 75 },
                      { label: "What", value: 76 },
                      { label: "What, Funny", value: 77 },
                      { label: "Uhhh", value: 78 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("character", characters[0]) ==
              "undertale-napstablook" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Looking Away", value: 2 },
                      { label: "Dapperblook", value: 79 },
                      { label: "Headset", value: 80 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("character", characters[0]) == "undertale-sans" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Looking Away", value: 2 },
                      { label: "Funny", value: 81 },
                      { label: "Winking", value: 1 },
                      { label: "Eyes Semi-Closed", value: 41 },
                      { label: "Eyes Closed", value: 4 },
                      { label: "Black Eyes", value: 82 },
                      { label: "Confused", value: 83 },
                      { label: "Looking Down", value: 84 },
                      { label: "Blue Eye", value: 85 },
                      { label: "Yellow Eye", value: 86 },
                      { label: "Hit", value: 87 },
                      { label: "Bleeding, Default", value: 88 },
                      { label: "Bleeding, Funny", value: 89 },
                      { label: "Bleeding, Eyes Closed", value: 90 },
                      { label: "Bleeding, Winking", value: 91 },
                      { label: "Bleeding, Confused", value: 92 },
                      { label: "Bleeding, Looking Down", value: 93 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("character", characters[0]) == "undertale-papyrus" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Laughing", value: 11 },
                      { label: "Looking Away", value: 2 },
                      { label: "Mad", value: 6 },
                      { label: "Googly Eyes", value: 32 },
                      { label: "Crying", value: 94 },
                      { label: "Evil", value: 9 },
                      { label: "Sweating", value: 20 },
                      { label: "Worried", value: 95 },
                      { label: "Cool Dude", value: 30 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("character", characters[0]) ==
              "undertale-monsterkid" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Angry", value: 7 },
                      { label: "Sad", value: 22 },
                      { label: "Worried", value: 95 },
                      { label: "Shocked", value: 14 },
                      { label: "Terrified", value: 21 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("character", characters[0]) == "undertale-maddummy" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Shocked", value: 14 },
                      { label: "Hurt", value: 17 },
                      { label: "Sweating", value: 20 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("character", characters[0]) == "undertale-temmie" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Hurt", value: 17 },
                      { label: "No Food", value: 96 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("character", characters[0]) == "undertale-muffet" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Angry", value: 7 },
                      { label: "Money", value: 33 },
                      { label: "Spider", value: 97 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("character", characters[0]) ==
              "undertale-omega-flowey" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Looking Away", value: 2 },
                      { label: "Funny", value: 81 },
                      { label: "Spooky", value: 98 },
                      { label: "Dark Screen", value: 99 },
                      { label: "Flowey", value: 100 },
                      { label: "Static", value: 101 },
                      { label: "Monster", value: 102 },
                      { label: "Human", value: 103 },
                      { label: "Everyone", value: 104 },
                      { label: "Smile", value: 105 },
                      { label: "Troll Face", value: 106 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
            {getSetting("character", characters[0]) == "undertale-gaster" && (
              <Flex.Child>
                <div>
                  <SelectInput
                    options={[
                      { label: "Default", value: 0 },
                      { label: "Creepy", value: 107 },
                      { label: "Sad", value: 22 },
                      { label: "Funny", value: 81 },
                      { label: "Apathetic", value: 108 },
                      { label: "Glowing Eyes", value: 109 },
                    ]}
                    value={expressions.indexOf(
                      getSetting("expression", expressions[0])
                    )}
                    onChange={(o) => {
                      updateSetting("expression", expressions[o.value]);
                      this.setState({ updater: !this.state.updater });
                    }}
                  >
                    Expression
                  </SelectInput>
                </div>
              </Flex.Child>
            )}
          </Flex>
          {getSetting("character", characters[0]) == characters[2] && (
            <TextAreaInput
              value={getSetting("url", "")}
              onChange={(o) => {
                updateSetting("url", o.toString());
                this.setState({ updater: !this.state.updater });
              }}
              rows={1}
            >
              URL
            </TextAreaInput>
          )}
          <TextAreaInput
            value={getSetting("message", "")}
            onChange={(o) => {
              updateSetting("message", o.toString());
              this.setState({ updater: !this.state.updater });
            }}
            rows={3}
          >
            Message
          </TextAreaInput>
          <img src={this.link()} width="100%" style={{ marginBottom: 20 }} />
        </Modal.Content>
        <Modal.Footer>
          <Button
            color={Button.Colors.GREEN}
            onClick={() => {
              messages.sendMessage(channels.getChannelId(), {
                content: this.link(),
              });
              closeModal();
            }}
          >
            Send
          </Button>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => {
              clipboard.writeText(this.link());
              closeModal();
            }}
          >
            Copy
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
  }
}

module.exports = GeneratorModal;
