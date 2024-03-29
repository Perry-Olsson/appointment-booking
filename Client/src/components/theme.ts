import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  homePage: {
    maxWidth: "60rem",
  },
  dashboard: {
    navBar: {
      height: 60,
      heightPx: "60px",
    },
  },
  navBar: {
    height: "80px",
    rawHeight: 80,
  },
  scheduler: {
    headerHeight: "30px",
  },
  dayView: {
    headerHeight: "70px",
    headerOffsetPixels: "150px",
    headerOffset: 150, // navBar height + dayView header height
    footerHeight: "90px",
    footerOffset: 90,
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
    sm_med: "1.20rem",
    med: "1.5rem",
    med_lg: "1.75rem",
    lg: "2rem",
  },
  colors: {
    primary: "#8b9153",
    primaryFaded: "#8b915360",
    primaryLight: "#b3b97d",
    primaryLightFaded: "#b3b97dbb",
    primaryMisted: "#f6f7dc",
    secondary: "#622101",
    secondaryLight: "#a85127",
    secondaryFaded: "#622101aa",
    textPrimary: "#2e2e2e",
    textSecondary: "#ffffff",
    gray: "#454545",
    lightGray: "#45454555",
    shadeGray: "#90909020",
    error: "#ff4444",
    errorBackground: "#f7d7d7",
  },
  form: {
    height: "50px",
    fieldMaxWidth: "500px",
    footerHeight: "75px",
  },
  icons: {
    small: "1rem",
    medium: "2rem",
  },
};

declare module "styled-components" {
  export interface DefaultTheme {
    homePage: {
      maxWidth: string;
    };
    dashboard: {
      navBar: {
        height: number;
        heightPx: string;
      };
    };
    navBar: {
      height: string;
      rawHeight: number;
    };
    scheduler: {
      headerHeight: string;
    };
    dayView: {
      headerHeight: string;
      headerOffset: number;
      headerOffsetPixels: string;
      footerHeight: string;
      footerOffset: number;
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
      primaryLight: string;
      primaryLightFaded: string;
      primaryFaded: string;
      primaryMisted: string;
      secondary: string;
      secondaryLight: string;
      secondaryFaded: string;
      textPrimary: string;
      textSecondary: string;
      gray: string;
      lightGray: string;
      shadeGray: string;
      error: string;
      errorBackground: string;
    };
    form: {
      height: string;
      fieldMaxWidth: string;
      footerHeight: string;
    };
    icons: {
      small: string;
      medium: string;
    };
  }
}
