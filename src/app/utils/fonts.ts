import localFont from "next/font/local";

export const interBold = localFont({
  src: "../../assets/fonts/inter/static/Inter_18pt-Bold.ttf",
  variable: "--font-inter-bold",
  display: "swap",
});
export const interMedium = localFont({
  src: "../../assets/fonts/inter/static/Inter_18pt-Medium.ttf",
  variable: "--font-inter-medium",
  display: "swap",
});
export const interRegular = localFont({
  src: "../../assets/fonts/inter/static/Inter_18pt-Regular.ttf",
  variable: "--font-inter-regular",
  display: "swap",
});
export const interSemiBold = localFont({
  src: "../../assets/fonts/inter/static/Inter_18pt-SemiBold.ttf",
  variable: "--font-inter-semi-bold",
  display: "swap",
});

export const notoBold = localFont({
  src: "../../assets/fonts/noto-serif/static/NotoSerif-Bold.ttf",
  variable: "--font-noto-bold",
  display: "swap",
});

export const notoMedium = localFont({
  src: "../../assets/fonts/noto-serif/static/NotoSerif-Medium.ttf",
  variable: "--font-noto-medium",
  display: "swap",
});

export const notoRegular = localFont({
  src: "../../assets/fonts/noto-serif/static/NotoSerif-Regular.ttf",
  variable: "--font-noto-regular",
  display: "swap",
});

export const notoSemiBold = localFont({
  src: "../../assets/fonts/noto-serif/static/NotoSerif-SemiBold.ttf",
  variable: "--font-noto-semi-bold",
  display: "swap",
});

export const sourceBold = localFont({
  src: "../../assets/fonts/source-code-pro/static/SourceCodePro-Bold.ttf",
  variable: "--font-source-bold",
  display: "swap",
});

export const sourceMedium = localFont({
  src: "../../assets/fonts/source-code-pro/static/SourceCodePro-Medium.ttf",
  variable: "--font-source-medium",
  display: "swap",
});

export const sourceRegular = localFont({
  src: "../../assets/fonts/source-code-pro/static/SourceCodePro-Regular.ttf",
  variable: "--font-source-regular",
  display: "swap",
});

export const sourceSemiBold = localFont({
  src: "../../assets/fonts/source-code-pro/static/SourceCodePro-SemiBold.ttf",
  variable: "--font-source-semi-bold",
  display: "swap",
});

const fontInter = `${interBold.variable} ${interMedium.variable} ${interRegular.variable} ${interSemiBold.variable} `;
const fontNoto = `${notoBold.variable} ${notoMedium.variable} ${notoRegular.variable} ${notoSemiBold.variable} `;
const fontSource = `${sourceBold.variable} ${sourceMedium.variable} ${sourceRegular.variable} ${sourceSemiBold.variable} `;

export const fonts = fontInter + fontNoto + fontSource;
