const { React, getModule } = require("powercord/webpack");
const { get } = require("powercord/http");
const {
  Flex,
  Card,
  Text,
  Divider,
  FormNotice,
} = require("powercord/components");
const {
  SelectInput,
  ButtonItem,
  TextAreaInput,
  SwitchItem,
} = require("powercord/components/settings");
const { open } = require("powercord/modal");
const Changelog = require("./Changelog");
const { nativeImage, clipboard } = require("electron");

module.exports = class Settings extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { getSetting, updateSetting, toggleSetting } = this.props;
    const modes = ["", "darkworld"];
    const boxes = [
      "undertale",
      "deltarune",
      "earthbound",
      "underswap",
      "underfell",
      "octagonal",
      "shadedground",
      "tubertale",
      "fnastale",
      "derp",
    ];
    const boxColors = ["white", "red", "orange", "yellow", "lime"];
    const characters = [
      "",
      "empty",
      "custom",
      "undertale-frisk",
      "undertale-flowey",
      "undertale-toriel",
      "undertale-dummy",
      "undertale-napstablook",
      "undertale-sans",
      "undertale-papyrus",
      "undertale-grillby",
      "undertale-monsterkid",
      "undertale-maddummy",
      "undertale-undyne",
      "undertale-undyne-undying",
      "undertale-temmie",
      "undertale-alphys",
      "undertale-mettaton",
      "undertale-muffet",
      "undertale-mettaton-ex",
      "undertale-mettaton-neo",
      "undertale-asgore",
      "undertale-omega-flowey",
      "undertale-asriel",
      "undertale-hyperdeath-asriel",
      "undertale-final-form-asriel",
      "undertale-chara",
      "undertale-gaster",
    ];
    const expressions = [
      "default",
      "wink",
      "looking-away",
      "raised-eyebrows",
      "closed-eyes",
      "sassy",
      "mad",
      "angry",
      "angry2",
      "evil",
      "grin",
      "laugh",
      "jaws",
      "skull",
      "shocked",
      "shocked2",
      "disappointed",
      "hurt",
      "hurt2",
      "scared",
      "sweat",
      "terrified",
      "sad",
      "sad-looking-away",
      "sad-looking-down",
      "sad-closed-eyes",
      "wilted",
      "wilted-stand-up",
      "crazy",
      "empty",
      "cool",
      "cute",
      "googly-eyes",
      "money",
      "toriel",
      "toriel-creepy",
      "asgore",
      "asgore-creepy",
      "asriel",
      "asriel-crying",
      "frisk",
      "semi-closed-eyes",
      "happy",
      "sad-smile",
    ];
    const link = `https://www.demirramon.com/utgen.png?text=${encodeURIComponent(
      getSetting("message", "Input a message!") || "Input a message!"
    )}&box=${getSetting("box", boxes[0])}&boxcolor=${getSetting(
      "boxcolor",
      boxColors[0]
    )}${
      getSetting("character", characters[0]) != ""
        ? "&character=" + getSetting("character", characters[0])
        : ""
    }&expression=${getSetting("expression", expressions[0])}${
      getSetting("url", "") != ""
        ? "&url=" + encodeURIComponent(getSetting("url", ""))
        : ""
    }${
      getSetting("mode", modes[0]) != ""
        ? "&mode=" + getSetting("mode", modes[0])
        : ""
    }`;
    const copyImageFromLink = async () => {
      /*const { body } = await get(link);
      const image = nativeImage.createFromBuffer(body);
      clipboard.writeImage(image);*/
      clipboard.writeText(link);
    };
    return (
      <div>
        <FormNotice
          imageData={{
            width: 60,
            height: 60,
            src: "/assets/0694f38cb0b10cc3b5b89366a0893768.svg",
          }}
          type={FormNotice.Types.WARNING}
          title="Please note:"
          body={
            <>
              This plugin is currently <b>very</b> unfinished. Expect
              unavailable features and bugs. While options may appear, most of
              them are not yet functional. However, don't let that discurage you
              from reporting bugs to me!
            </>
          }
        />
        <div style={{ marginBottom: 20 }} />
        <Card style={{ padding: "18px" }}>
          <Text>
            This plugin is inspired by{" "}
            <b>
              <a
                href="https://github.com/powercord-community/suggestions/issues/94"
                target="_blank"
              >
                this suggestion
              </a>
            </b>
            . I know it's not exactly the same, but I'm still pretty new to
            Powercord plugins. I hope you like the plugin anyway!
          </Text>
        </Card>
        <Divider />
        <div style={{ marginBottom: 20 }} />
        <SwitchItem
          note="Display changelog on startup?"
          value={getSetting("displayChangelog", true)}
          onChange={() => toggleSetting("displayChangelog")}
        >
          Changelog
        </SwitchItem>
        <ButtonItem
          onClick={() => {
            open(() => React.createElement(Changelog));
          }}
          note="Shows the changes in the latest update."
          button="Changelog"
        >
          Open Changelog
        </ButtonItem>
        <Flex>
          <Flex.Child>
            <div>
              <SelectInput
                options={[
                  { label: "Regular", value: 0 },
                  { label: "Dark World (Deltarune)", value: 1 },
                ]}
                value={modes.indexOf(getSetting("mode", modes[0]))}
                onChange={(o) => updateSetting("mode", modes[o.value])}
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
                onChange={(o) => updateSetting("box", boxes[o.value])}
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
                value={boxColors.indexOf(getSetting("boxcolor", boxColors[0]))}
                onChange={(o) => updateSetting("boxcolor", boxColors[o.value])}
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
                    { label: "Use URL", value: 2 },
                  ]}
                  value={characters.indexOf(
                    getSetting("character", characters[0])
                  )}
                  onChange={(o) => {
                    updateSetting("character", characters[o.value]);
                    updateSetting("expression", expressions[0]);
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
                  }}
                >
                  Character
                </SelectInput>
              </div>
            </Flex.Child>
          )}
          {/* EXPRESSIONS */}
          {getSetting("character", characters[0]) == characters[4] && (
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
                  onChange={(o) =>
                    updateSetting("expression", expressions[o.value])
                  }
                >
                  Expression
                </SelectInput>
              </div>
            </Flex.Child>
          )}
          {getSetting("character", characters[0]) == characters[5] && (
            <Flex.Child>
              <div>
                <SelectInput
                  options={[
                    { label: "Default", value: 0 }, //
                    { label: "Looking Away", value: 2 }, //
                    { label: "Eyes Semi-Closed", value: 41 }, //
                    { label: "Eyes Closed", value: 4 }, //
                    { label: "Happy", value: 42 }, //
                    { label: "Sad Smile", value: 43 }, //
                    { label: "Sad", value: 6 },
                    { label: "Eyes Semi-Closed, Sad", value: 7 },
                    { label: "Eyes Closed, Sad", value: 8 },
                    { label: "Eyes Closed, Sad 2", value: 9 },
                    { label: "Eyes Closed, Sad 3", value: 10 },
                    { label: "Eyes Closed, Sad 4", value: 11 },
                    { label: "Eyes Closed, Sad 5", value: 12 },
                    { label: "Eyes Closed, Sad 6", value: 13 },
                    { label: "Looking Away, Sad", value: 14 },
                    { label: "Looking Away, Sad 2", value: 15 },
                    { label: "Eyes Closed, Smiling, Sad", value: 16 },
                    { label: "Blushing", value: 17 },
                    { label: "Surprised", value: 18 },
                    { label: "Shocked", value: 19 },
                    { label: "Crazy 1", value: 20 },
                    { label: "Crazy 2", value: 21 },
                    { label: "Crazy 3", value: 22 },
                    { label: "Eyes Semi-Closed, Happy", value: 23 },
                    { label: "Disbelief", value: 24 },
                    { label: "Disbelief, Looking Away", value: 25 },
                    { label: "Incredulous", value: 26 },
                    { label: "Incredulous, Looking Away", value: 27 },
                    { label: "Annoyed", value: 28 },
                    { label: "Annoyed 2", value: 29 },
                    { label: "Serious", value: 30 },
                    { label: "Serious, Talking", value: 31 },
                    { label: "Serious, Looking Away", value: 32 },
                    { label: "Pissed", value: 33 },
                    { label: "Glasses", value: 34 },
                    { label: "Glasses, Happy", value: 35 },
                    { label: "Glasses, Eyes Semi-Closed", value: 36 },
                    { label: "Glasses, Looking Away", value: 37 },
                    { label: "Glasses, Pissed", value: 38 },
                    { label: "Hurt", value: 39 },
                    { label: "Hurt, Laughing", value: 40 },
                    { label: "What", value: 41 },
                    { label: "What, Funny", value: 42 },
                    { label: "Uhhh", value: 43 },
                  ]}
                  value={expressions.indexOf(
                    getSetting("expression", expressions[0])
                  )}
                  onChange={(o) =>
                    updateSetting("expression", expressions[o.value])
                  }
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
            onChange={(o) => updateSetting("url", o.toString())}
            rows={1}
          >
            URL
          </TextAreaInput>
        )}
        <TextAreaInput
          value={getSetting("message", "")}
          onChange={(o) => updateSetting("message", o.toString())}
          rows={3}
        >
          Message
        </TextAreaInput>
        <ButtonItem
          onClick={() => {
            copyImageFromLink();
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
