const CURRENTCY_FORATTER = new Intl.NumberFormat(undefined, {
    currency: "USD", style: "currency"
});

export function FormatCurrency(number: number) {
    return CURRENTCY_FORATTER.format(number);
}