const { React } = require("powercord/webpack");
const { Plugin } = require("powercord/entities");
const Settings = require("./components/Settings.jsx");

module.exports = class UndertaleDialogGenerator extends Plugin {
  startPlugin() {
    powercord.api.settings.registerSettings("undertale-dialog-generator", {
      category: this.entityID,
      label: "Undertale Dialog Generator",
      render: Settings,
    });
  }

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("undertale-dialog-generator");
  }
};
