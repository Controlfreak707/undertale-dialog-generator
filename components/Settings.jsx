const { React, getModule } = require("powercord/webpack");
const { Flex, Card, Text, Divider } = require("powercord/components");
const {
  SelectInput,
  ButtonItem,
  TextAreaInput,
} = require("powercord/components/settings");
const { clipboard } = getModule(["clipboard"], false);

module.exports = class Settings extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { getSetting, updateSetting, toggleSetting } = this.props;
    const evaluateMode = () => {
      switch (getSetting("mode", 0)) {
        case 0:
          return "";
          break;
        case 1:
          return "darkworld";
          break;
      }
    };
    const evaluateBox = () => {
      switch (getSetting("box", 0)) {
        case 0:
          return "undertale";
          break;
        case 1:
          return "deltarune";
          break;
        case 2:
          return "earthbound";
          break;
        case 3:
          return "underswap";
          break;
        case 4:
          return "underfell";
          break;
        case 5:
          return "octagonal";
          break;
        case 6:
          return "shadedground";
          break;
        case 7:
          return "tubertale";
          break;
        case 8:
          return "fnastale";
          break;
        case 9:
          return "derp";
          break;
      }
    };
    const evaluateBoxColor = () => {
      switch (getSetting("boxcolor", 0)) {
        case 0:
          return "white";
          break;
        case 1:
          return "red";
          break;
        case 2:
          return "orange";
          break;
        case 3:
          return "yellow";
          break;
        case 4:
          return "lime";
          break;
      }
    };
    const evaluateCharacter = () => {
      switch (getSetting("character", 0)) {
        case 0:
          return "";
          break;
        case 1:
          return "empty";
          break;
        case 2:
          return "undertale-frisk";
          break;
        case 3:
          return "undertale-flowey";
          break;
      }
    };
    const evaluateExpression = () => {
      switch (getSetting("expression", 0)) {
        case 0:
          return "default";
          break;
        case 1:
          return "wink";
          break;
        case 2:
          return "looking-away";
          break;
        case 3:
          return "raised-eyebrows";
          break;
        case 4:
          return "closed-eyes";
          break;
        case 5:
          return "sassy";
          break;
        case 6:
          return "mad";
          break;
        case 7:
          return "angry";
          break;
        case 8:
          return "angry2";
          break;
        case 9:
          return "evil";
          break;
        case 10:
          return "grin";
          break;
        case 11:
          return "laugh";
          break;
        case 12:
          return "jaws";
          break;
        case 13:
          return "skull";
          break;
        case 14:
          return "shocked";
          break;
        case 15:
          return "shocked2";
          break;
        case 16:
          return "disappointed";
          break;
        case 17:
          return "hurt";
          break;
        case 18:
          return "hurt2";
          break;
        case 19:
          return "scared";
          break;
        case 20:
          return "sweat";
          break;
        case 21:
          return "terrified";
          break;
        case 22:
          return "sad";
          break;
        case 23:
          return "sad-looking-away";
          break;
        case 24:
          return "sad-looking-down";
          break;
        case 25:
          return "sad-closed-eyes";
          break;
        case 26:
          return "wilted";
          break;
        case 27:
          return "wilted-stand-up";
          break;
        case 28:
          return "crazy";
          break;
        case 29:
          return "empty";
          break;
        case 30:
          return "cool";
          break;
        case 31:
          return "cute";
          break;
        case 32:
          return "googly-eyes";
          break;
        case 33:
          return "money";
          break;
        case 34:
          return "toriel";
          break;
        case 35:
          return "toriel-creepy";
          break;
        case 36:
          return "asgore";
          break;
        case 37:
          return "asgore-creepy";
          break;
        case 38:
          return "asriel";
          break;
        case 39:
          return "asriel-crying";
          break;
        case 40:
          return "frisk";
          break;
      }
    };
    const link = `https://www.demirramon.com/utgen.png?message=mode=${evaluateMode()} box=${evaluateBox()} boxcolor=${evaluateBoxColor()} character=${evaluateCharacter()} expression=${evaluateExpression()} ${
      getSetting("message") || "Input a message!"
    }`;
    return (
      <div>
        <Card style={{ padding: "18px" }}>
          <Text>
            This plugin is inspired by{" "}
            <b>
              <a href="https://github.com/powercord-community/suggestions/issues/94">
                this suggestion
              </a>
            </b>
            . I know it's not exactly the same, but I'm still pretty new to
            Powercord plugins. I hope you like the plugin anyway!
          </Text>
        </Card>
        <Divider />
        <div style={{ marginBottom: 20 }} />
        <Flex>
          <Flex.Child>
            <div>
              <SelectInput
                options={[
                  { label: "Regular", value: 0 },
                  { label: "Dark World (Deltarune)", value: 1 },
                ]}
                value={getSetting("mode", 0)}
                onChange={(o) => updateSetting("mode", o.value)}
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
                value={getSetting("box", 0)}
                onChange={(o) => updateSetting("box", o.value)}
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
                value={getSetting("boxcolor", 0)}
                onChange={(o) => updateSetting("boxcolor", o.value)}
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
                onChange={(o) => updateSetting("universe", o.value)}
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
                  ]}
                  value={getSetting("character", 0)}
                  onChange={(o) => {
                    updateSetting("character", o.value);
                    updateSetting("expression", 0);
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
                    { label: "Frisk", value: 2 },
                    { label: "Flowey", value: 3 },
                  ]}
                  value={getSetting("character", 2)}
                  onChange={(o) => {
                    updateSetting("character", o.value);
                    updateSetting("expression", 0);
                  }}
                >
                  Character
                </SelectInput>
              </div>
            </Flex.Child>
          )}
          {/* EXPRESSIONS */}
          {getSetting("character", 0) == 3 && (
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
                  value={getSetting("expression", 0)}
                  onChange={(o) => updateSetting("expression", o.value)}
                >
                  Expression
                </SelectInput>
              </div>
            </Flex.Child>
          )}
        </Flex>
        <TextAreaInput
          value={getSetting("message")}
          onChange={(o) => updateSetting("message", o.toString())}
          rows={3}
        >
          Message
        </TextAreaInput>
        <ButtonItem
          onClick={() => {
            clipboard.copy(encodeURI(link));
          }}
          note="Copy the image link to send to your friends."
          button="Copy"
        >
          Copy Image Link
        </ButtonItem>
        <img src={link} width="100%" />
      </div>
    );
  }
};
