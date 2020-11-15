const {
  React,
  getModuleByDisplayName,
  getModule,
} = require("powercord/webpack");
const Tooltip = getModuleByDisplayName("Tooltip", false);
const Button = require("powercord/components").Button;
const buttonClasses = getModule(["button"], false);
const buttonWrapperClasses = getModule(["buttonWrapper", "pulseButton"], false);
const buttonTextAreaClasses = getModule(["button", "textArea"], false);

module.exports = () => (
  <Tooltip color="black" postion="top" text="Undertale Dialog Generator">
    {({ onMouseLeave, onMouseEnter }) => (
      <Button
        look={Button.Looks.BLANK}
        size={Button.Sizes.ICON}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={`${buttonClasses.contents} ${buttonWrapperClasses.button} ${buttonTextAreaClasses.button}`}
        >
          <svg
            className={`${buttonWrapperClasses.icon}`}
            width="18"
            height="18"
            viewBox="0 0 400 400"
          >
            <path
              fill="currentColor"
              d="M49.689 12.400 L 49.800 24.800 37.600 24.848 C 30.890 24.874,25.265 24.873,25.100 24.847 C 24.935 24.821,24.821 24.935,24.847 25.100 C 24.873 25.265,24.874 30.890,24.848 37.600 L 24.800 49.800 12.400 49.689 L 0.000 49.578 0.000 149.989 L 0.000 250.400 24.800 250.400 L 49.600 250.400 49.600 274.920 C 49.600 293.458,49.717 299.557,50.080 299.920 C 50.443 300.283,56.542 300.400,75.080 300.400 L 99.600 300.400 99.600 324.920 C 99.600 343.458,99.717 349.557,100.080 349.920 C 100.443 350.283,106.542 350.400,125.080 350.400 L 149.600 350.400 149.600 375.200 L 149.600 400.000 200.000 400.000 L 250.400 400.000 250.400 375.200 L 250.400 350.400 274.920 350.400 C 293.458 350.400,299.557 350.283,299.920 349.920 C 300.283 349.557,300.400 343.458,300.400 324.920 L 300.400 300.400 324.920 300.400 C 343.458 300.400,349.557 300.283,349.920 299.920 C 350.283 299.557,350.400 293.458,350.400 274.920 L 350.400 250.400 375.200 250.400 L 400.000 250.400 400.000 150.000 L 400.000 49.600 387.600 49.600 L 375.200 49.600 375.153 37.500 C 375.127 30.845,375.127 25.265,375.153 25.100 C 375.179 24.935,369.620 24.800,362.800 24.800 L 350.400 24.800 350.400 12.400 L 350.400 0.000 324.989 0.000 L 299.578 0.000 299.689 12.397 L 299.800 24.794 274.800 24.897 L 249.800 25.000 249.694 37.294 L 249.588 49.588 237.294 49.694 L 225.000 49.800 224.897 74.800 L 224.794 99.800 200.000 99.694 L 175.206 99.588 175.103 74.694 L 175.000 49.800 162.706 49.694 L 150.412 49.588 150.306 37.294 L 150.200 25.000 125.300 24.897 L 100.400 24.794 100.400 12.397 L 100.400 0.000 74.989 0.000 L 49.578 0.000 49.689 12.400 "
            />
          </svg>
        </div>
      </Button>
    )}
  </Tooltip>
);
