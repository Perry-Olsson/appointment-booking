import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  navBar: {
    height: "3.7rem",
  },
  scheduler: {
    headerHeight: "1.8rem",
  },
  modal: {
    topOffset: "5.5rem", //navBar.height + schedule.headerHeight
    transitionTime: 300,
  },
  grid: {
    width: "90vw",
    cellWidth: "12.857vw", // grid.width / 7
    maxWidth: "600px",
    cellMaxWidth: "85.714px", // grid.maxWidth / 7
  },
  font: {
    small: "1rem",
    medium: "1.5rem",
    large: "2rem",
  },
  colors: {
    primary: "#5eab55",
    textPrimary: "#2e2e2e",
    textSecondary: "#ffffff",
  },
  icons: {
    small: "1rem",
    medium: "2rem",
  },
};

declare module "styled-components" {
  export interface DefaultTheme {
    navBar: {
      height: string;
    };
    scheduler: {
      headerHeight: string;
    };
    modal: {
      topOffset: string;
      transitionTime: number;
    };
    grid: {
      width: string;
      cellWidth: string;
      maxWidth: string;
      cellMaxWidth: string;
    };
    font: {
      small: string;
      medium: string;
      large: string;
    };
    colors: {
      primary: string;
      textPrimary: string;
      textSecondary: string;
    };
    icons: {
      small: string;
      medium: string;
    };
  }
}
