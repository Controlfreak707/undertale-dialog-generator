const { React } = require("powercord/webpack");
const { Plugin } = require("powercord/entities");
const Settings = require("./components/Settings.jsx");
const manifest = require("./manifest.json");

const { open } = require("powercord/modal");
const Changelog = require("./components/Changelog");

module.exports = class UndertaleDialogGenerator extends Plugin {
  startPlugin() {
    powercord.api.settings.registerSettings("undertale-dialog-generator", {
      category: this.entityID,
      label: "Undertale Dialog Generator",
      render: Settings,
    });

    if (this.settings.get("version", "0.1.0") != manifest.version) {
      open(() => React.createElement(Changelog));
    }
    this.settings.set("version", manifest.version);

    powercord.api.commands.registerCommand({
      command: "undertale",
      description:
        "Generates Undertale dialogue based off of your current settings.",
      usage: "{c} [ ...arguments ]",
      executor: (args) => ({
        send: true,
        result: `https://www.demirramon.com/utgen.png?text=${encodeURIComponent(
          args.join(" ") ||
            this.settings.get("message", "Input a message!") ||
            "Input a message!"
        )}&box=${this.settings.get(
          "box",
          "undertale"
        )}&boxcolor=${this.settings.get(
          "boxcolor",
          "white"
        )}&character=${this.settings.get(
          "character",
          ""
        )}&expression=${this.settings.get(
          "expression",
          "default"
        )}&url=${encodeURIComponent(
          this.settings.get("url", "")
        )}&mode=${this.settings.get("mode", "")}`,
      }),
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("undertale");
    powercord.api.settings.unregisterSettings("undertale-dialog-generator");
  }
};
