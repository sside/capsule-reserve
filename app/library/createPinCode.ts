export const createPinCode = (length = 4): string =>
    Math.floor(Math.random() * 10000)
        .toString()
        .padStart(length, "0");
