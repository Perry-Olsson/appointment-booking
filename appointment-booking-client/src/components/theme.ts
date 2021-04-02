import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  navBar: {
    height: "60px",
  },
  scheduler: {
    headerHeight: "30px",
  },
  dayView: {
    headerHeight: "50px",
    headerOffset: 110, // navBar height + dayView header height
    appointmentBlockRadius: "9px",
    appointmentBlockColor: "#909090",
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
    primaryFaded: "#5eab5560",
    textPrimary: "#2e2e2e",
    textSecondary: "#ffffff",
    gray: "#454545",
    lightGray: "#45454555",
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
      appointmentBlockRadius: string;
      appointmentBlockColor: string;
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
      gray: string;
      lightGray: string;
    };
    icons: {
      small: string;
      medium: string;
    };
  }
}
