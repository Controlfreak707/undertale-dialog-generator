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
const GeneratorModal = require("./components/GeneratorModal");
const Button = require("./components/Button");
const CharacterLimitModal = require("./components/CharacterLimitModal");

module.exports = class UndertaleDialogGenerator extends Plugin {
  async startPlugin() {
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

    var pressedKeys = {};
    window.onkeyup = function (e) {
      pressedKeys[e.keyCode] = false;
    };
    window.onkeydown = function (e) {
      pressedKeys[e.keyCode] = true;
    };

    this.loadStylesheet("style.css");

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
              className: "undertale-dialog-generator-button",
              onClick: () => {
                pressedKeys["18"]
                  ? this.settings.set(
                      "autogenerate",
                      !this.settings.get("autogenerate", false)
                    )
                  : open(() => React.createElement(GeneratorModal));
              },
            },
            React.createElement(Button, {
              toggled: this.settings.get("autogenerate", false),
            })
          )
        );
        return res;
      }
    );
    ChannelTextAreaContainer.type.render.displayName =
      "ChannelTextAreaContainer";

    const MessageEvents = await getModule(["sendMessage"]);
    inject(
      "undertale-dialog-generator-autogenerator",
      MessageEvents,
      "sendMessage",
      (args) => {
        if (this.settings.get("autogenerate", false) == false) return args;

        var message = args[1].content.trim();

        if (message.includes("https://www.demirramon.com/utgen.png"))
          return args;

        if (message.length > 71) {
          open(() => React.createElement(CharacterLimitModal, { message }));
          args[1].content = "";
          return args;
        }

        var {
          modes,
          boxes,
          colors,
          characters,
          expressions,
        } = require("./options.json");

        args[1].content = `https://www.demirramon.com/utgen.png?text=${encodeURIComponent(
          message || "Input a message!"
        )}&box=${this.settings.get("box", boxes[0])}${
          this.settings.get("boxcolor", colors[0]) != colors[0]
            ? "&boxcolor=" + this.settings.get("boxcolor", colors[0])
            : ""
        }${
          this.settings.get("character", characters[0]) != characters[0]
            ? "&character=" + this.settings.get("character", characters[0])
            : ""
        }&expression=${this.settings.get("expression", expressions[0])}${
          this.settings.get("url", "") != "" &&
          this.settings.get("character", characters[0]) == "custom"
            ? "&url=" + encodeURIComponent(this.settings.get("url", ""))
            : ""
        }${
          this.settings.get("charcolor", colors[0]) != colors[0]
            ? "&charcolor=" + this.settings.get("charcolor", colors[0])
            : ""
        }${
          this.settings.get("mode", modes[0]) != ""
            ? "&mode=" + this.settings.get("mode", modes[0])
            : ""
        }`;
        return args;
      },
      true
    );
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("undertale");
    powercord.api.settings.unregisterSettings("undertale-dialog-generator");
    uninject("undertale-dialog-generator-button");
    document
      .querySelectorAll("undertale-dialog-generator-button")
      .forEach((e) => (e.style.display = "none"));
    uninject("undertale-dialog-generator-autogenerator");
  }
};
