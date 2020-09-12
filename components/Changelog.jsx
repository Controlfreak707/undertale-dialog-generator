const { React } = require("powercord/webpack");
const { Flex, FormTitle } = require("powercord/components");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");

const { version } = require("../manifest.json");

module.exports = () => (
  <Modal className="powercord-text">
    <Modal.Header>
      <Flex.Child>
        <FormTitle tag="h4">Undertale Dialog Generator v{version}</FormTitle>
        <div class="colorStandard-2KCXvj size12-3cLvbJ date-1k6kG2">
          12 September 2020
        </div>
      </Flex.Child>
      <Flex.Child>
        <Modal.CloseButton onClick={closeModal} />
      </Flex.Child>
    </Modal.Header>
    <div
      class="content-1LAB8Z container-1_ClKi content-s2SEQO thin-1ybCId scrollerBase-289Jih"
      dir="ltr"
      style={({ overflow: "hidden scroll" }, { paddingRight: "8px" })}
    >
      {/*<h1 class="added-2hLRj3 title-18Xx5z marginTop-2incQ6">
        NEW CHARACTERS{" "}
      </h1>
      <ul>
        <li>
          <strong>Added Chara.</strong> Chara is now here complete with her
          terrifying expressions!
        </li>
        <li>
          <strong>Added Sans.</strong> He really should've already been added...
        </li>
</ul>*/}
      <h1 class="progress-YsDrV- title-18Xx5z">FIXES AND UPDATES </h1>
      <ul>
        <li>
          <strong>There's a changelog now!</strong> Incase you couldn't tell...
        </li>
        <li>
          <strong>Adjusted the warning.</strong> It REALLY didn't look too hot
          before, but it's much better now!
        </li>
      </ul>
      <div
        aria-hidden="true"
        style={
          ({ position: "absolute" },
          { pointerEvents: "none" },
          { minHeight: "0px" },
          { minWidth: "1px" },
          { flex: "0 0 auto" },
          { height: "20px" })
        }
      ></div>
    </div>
  </Modal>
);
