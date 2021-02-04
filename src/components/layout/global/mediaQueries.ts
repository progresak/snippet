const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    compact: '680px',
    tablet: '768px',
    // laptop: '1024px',
    // laptopL: '1440px',
    // desktop: '2560px',
};

export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    compact: `(max-width: ${size.compact})`,
    compactMin: `(min-width: ${size.compact})`,
    tablet: `(max-width: ${size.tablet})`,

    // laptop: `(min-width: ${size.laptop})`,
    // laptopL: `(min-width: ${size.laptopL})`,
    // desktop: `(min-width: ${size.desktop})`,
    // desktopL: `(min-width: ${size.desktop})`,
};
