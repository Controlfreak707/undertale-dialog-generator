const { React } = require("powercord/webpack");
const { Card, Text, Divider, FormNotice } = require("powercord/components");
const { ButtonItem, SwitchItem } = require("powercord/components/settings");
const { open } = require("powercord/modal");
const Changelog = require("./Changelog");

module.exports = class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getSetting, toggleSetting } = this.props;
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
      </div>
    );
  }
};
