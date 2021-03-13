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
    width: "100%",
    cellHeight: "15vw", // grid.width / 7
    maxWidth: "1300px",
    cellMaxHeight: "100px",
    borderColor: "#00000035",
  },
  font: {
    sm: "1rem",
    sm_med: "1.25rem",
    med: "1.5rem",
    med_lg: "1.75rem",
    lg: "2rem",
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
      cellHeight: string;
      maxWidth: string;
      cellMaxHeight: string;
      borderColor: string;
    };
    font: {
      sm: string;
      sm_med: string;
      med: string;
      med_lg: string;
      lg: string;
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
