export const device = {
  mobile: {
    width: 415,
    pixels: "415px",
  },
  tablet: {
    width: 770,
    pixels: "770px",
    largeWidth: 870,
    largePixels: "870px",
  },
  desktop: {
    width: 1025,
    pixels: "1025px",
    largeWidth: 1300,
    largePixels: "1300px",
  },
  isMobile: function (width: number) {
    return width <= this.mobile.width;
  },
  isTabletOrSmaller: function (width: number) {
    return width <= this.tablet.width;
  },
  isLapTopOrBigger: function (width: number) {
    return width > this.tablet.width;
  },
  isDesktop: function (width: number) {
    return width > this.desktop.width;
  },
  isLargeDesktop: function (width: number) {
    return width > this.desktop.largeWidth;
  },
  isNotWideScreen: function (width: number) {
    return width < this.desktop.width;
  },
};
