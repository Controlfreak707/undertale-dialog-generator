const { React } = require("powercord/webpack");
const { Flex, FormTitle, Text } = require("powercord/components");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");

const { version } = require("../manifest.json");

module.exports = () => (
  <Modal className="powercord-text">
    <Modal.Header separator={false}>
      <Flex.Child>
        <FormTitle tag="h4">Undertale Dialog Generator</FormTitle>
        <div class="colorStandard-2KCXvj size12-3cLvbJ date-1k6kG2">
          14 November 2020
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
      <img
        class="image-2WjK2f"
        src={`https://www.demirramon.com/utgen.png?text=Here's%20what's%20new%20in%20color%3Dred%20Undertale%20Dialog%20Generator%20color%3Dwhite%20v${version}%3A&box=undertale&boxcolor=white&character=custom&expression=default&url=https%3A%2F%2Fi.imgur.com%2FthiTjiZ.png`}
      ></img>
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
          <b>Updated the changelog a bit.</b> Now, the changelog has an image, a
          footer, and is overall more accurate to the official Discord
          changelog!
        </li>
        <li>
          <b>Fixed empty parameters messing things up.</b> Apparently, the
          reason why the image didn't always get loaded was because of empty
          parameters...
        </li>
      </ul>
    </div>
    <Modal.Footer direction="horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG">
      <div className="footer-SqIiQ_">
        <a
          className="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB socialLink-3n2n25"
          href="https://github.com/Controlfreak707"
          rel="noreferrer noopener"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 496 512"
            aria-hidden="false"
          >
            <path
              fill="currentColor"
              d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
            />
          </svg>
        </a>
        <Text size="size12-3cLvbJ">Check out more plugins at my github!</Text>
      </div>
    </Modal.Footer>
  </Modal>
);
