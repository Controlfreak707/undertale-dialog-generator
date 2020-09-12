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
  }

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("undertale-dialog-generator");
  }
};
