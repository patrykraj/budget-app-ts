export const lightTheme = {
  spacing: {
    xxs: 5,
    xs: 10,
    sm: 20,
    xl: 30,
  },
  font: {
    colors: {
      light: "rgb(238, 238, 238)",
      dark: "rgb(34, 34, 34)",
      blue: "rgb(138, 180, 248)",
    },
    sizes: {
      xs: ".8rem",
      xl: "1.2rem",
    },
  },
  colors: {
    gray: {
      light: "rgb(238, 238, 238)",
      normal: "rgb(222, 220, 220)",
      dark: "rgb(212, 212, 212)",
    },
    green: {
      normal: "rgb(85, 150, 0)",
    },
    red: {
      normal: "rgb(255, 0, 0)",
      dark: "rgb(220, 20, 60)",
    },
    pink: {
      normal: "rgb(219, 112, 147)",
    },
    blue: {
      normal: "rgb(66, 133, 244)",
    },
    white: {
      light: "rgb(253, 253, 253)",
      gray: "rgb(248, 248, 248)",
    },
  },
  bg: {
    light: "rgba(255, 255, 255, 0.2)",
    dark: "rgba(0, 0, 0, 0.6)",
  },
  switch: {
    day: "yellow",
    night: "darkgrey",
  },
};

export const darkTheme = {
  ...lightTheme,
  font: {
    ...lightTheme.font,
    colors: {
      ...lightTheme.font.colors,
      light: lightTheme.font.colors.dark,
      dark: lightTheme.font.colors.light,
    },
  },
  colors: {
    ...lightTheme.colors,
    gray: {
      light: "rgb(67, 67, 67)",
      normal: "rgb(85, 85, 85)",
      dark: "rgb(93, 93, 93)",
    },
    white: {
      light: "rgb(32, 32, 32)",
      gray: "rgb(57, 57, 57)",
    },
  },
  bg: {
    ...lightTheme.bg,
    light: lightTheme.bg.dark,
    dark: lightTheme.bg.light,
  },
  switch: {
    day: lightTheme.switch.night,
    night: lightTheme.switch.day,
  },
};
