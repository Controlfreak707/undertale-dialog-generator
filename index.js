const { React, getModule } = require("powercord/webpack");
const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { findInReactTree } = require("powercord/util");
const ChannelTextAreaContainer = getModule(
  (m) =>
    m.type &&
    m.type.render &&
    m.type.render.displayName === "ChannelTextAreaContainer",
  false
);
const Settings = require("./components/Settings.jsx");
const manifest = require("./manifest.json");

const { open } = require("powercord/modal");
const Changelog = require("./components/Changelog");
const Modal = require("./components/Modal");
const Button = require("./components/Button");

module.exports = class UndertaleDialogGenerator extends Plugin {
  startPlugin() {
    powercord.api.settings.registerSettings("undertale-dialog-generator", {
      category: this.entityID,
      label: "Undertale Dialog Generator",
      render: Settings,
    });

    if (
      this.settings.get("version", "0.1.0") != manifest.version &&
      this.settings.get("displayChangelog", true)
    ) {
      open(() => React.createElement(Changelog));
    }
    this.settings.set("version", manifest.version);

    powercord.api.commands.registerCommand({
      command: "undertale",
      description:
        "Generates Undertale dialogue based off of your current settings.",
      usage: "{c} <dialogue>",
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

    const settings = {
      getSetting: function (setting, fallback) {
        this.settings.get(setting, fallback);
      },
      updateSetting: function (setting, value) {
        this.settings.set(setting, value);
      },
    };

    inject(
      "undertale-dialog-generator-button",
      ChannelTextAreaContainer.type,
      "render",
      (args, res) => {
        const props = findInReactTree(
          res,
          (r) => r && r.className && r.className.indexOf("buttons-") == 0
        );
        props.children.unshift(
          React.createElement(
            "div",
            {
              className: ".undertale-dialog-generator-button",
              onClick: () =>
                open(() =>
                  React.createElement(Modal, {
                    settings: settings,
                  })
                ),
            },
            React.createElement(Button)
          )
        );
        return res;
      }
    );
    ChannelTextAreaContainer.type.render.displayName =
      "ChannelTextAreaContainer";
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("undertale");
    powercord.api.settings.unregisterSettings("undertale-dialog-generator");
    uninject("undertale-dialog-generator-button");
    document
      .querySelectorAll(".undertale-dialog-generator-button")
      .forEach((e) => (e.style.display = "none"));
  }
};
