import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  navBar: {
    height: "60px",
  },
  scheduler: {
    headerHeight: "30px",
  },
  dayView: {
    headerHeight: "45px",
    headerOffset: 105, // navBar height + dayView header height
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
    primaryFaded: "#5eab5540",
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
    dayView: {
      headerHeight: string;
      headerOffset: number;
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
      primaryFaded: string;
      textPrimary: string;
      textSecondary: string;
    };
    icons: {
      small: string;
      medium: string;
    };
  }
}
