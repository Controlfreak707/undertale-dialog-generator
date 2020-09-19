const { React } = require("powercord/webpack");
const { clipboard } = require("electron");
const settings = powercord.api.settings.buildCategoryObject(
  "undertale-dialog-generator"
);
const {
  FormTitle,
  Button,
  FormNotice,
  Divider,
  Flex,
  Spinner,
} = require("powercord/components");
const {
  SelectInput,
  ButtonItem,
  TextAreaInput,
  SwitchItem,
} = require("powercord/components/settings");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");

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
  settings.get("message", "Input a message!") || "Input a message!"
)}&box=${settings.get("box", boxes[0])}&boxcolor=${settings.get(
  "boxcolor",
  boxColors[0]
)}&character=${settings.get(
  "character",
  characters[0]
)}&expression=${settings.get(
  "expression",
  expressions[0]
)}&url=${encodeURIComponent(settings.get("url", ""))}&mode=${settings.get(
  "mode",
  modes[0]
)}`;

module.exports = () => (
  <Modal className="powercord-text">
    <Modal.Header>
      <FormTitle tag="h4">Undertale Dialog Generator</FormTitle>
      <Modal.CloseButton onClick={closeModal} />
    </Modal.Header>
    <Modal.Content>
      <FormNotice
        imageData={{
          width: 60,
          height: 60,
          src: "/assets/0694f38cb0b10cc3b5b89366a0893768.svg",
        }}
        type={FormNotice.Types.WARNING}
        title="WARNING"
        body={
          <>
            This part of the plugin is <b>even more</b> unfinished compared to
            the settings page! I recommend staying there for now.
          </>
        }
      />
      <Divider />
      <div style={{ marginBottom: 20 }} />
      <Spinner />
      {/*<Flex>
        <Flex.Child>
          <div>
            <SelectInput
              options={[
                { label: "Regular", value: 0 },
                { label: "Dark World (Deltarune)", value: 1 },
              ]}
              value={modes.indexOf(settings.get("mode", modes[0]))}
              onChange={(o) => settings.set("mode", modes[o.value])}
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
              value={boxes.indexOf(settings.get("box", boxes[0]))}
              onChange={(o) => settings.set("box", boxes[o.value])}
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
              value={boxColors.indexOf(settings.get("boxcolor", boxColors[0]))}
              onChange={(o) => settings.set("boxcolor", boxColors[o.value])}
            >
              Box Color
            </SelectInput>
          </div>
        </Flex.Child>
      </Flex>
      <img src={link} width="100%" />*/}
      <div style={{ marginBottom: 20 }} />
    </Modal.Content>
    <Modal.Footer>
      <Button
        onClick={() => {
          clipboard.writeText(link);
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
