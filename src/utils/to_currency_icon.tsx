export function toCurrencyIcon(currency: string) {
    switch (currency) {
        case "usd":
            return "$";
        case "gbp":
            return "£";
        default:
            return "$";
    }
}
