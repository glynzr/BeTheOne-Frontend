export const translateCategory = function (category: string) {
    switch (category) {
        case "Clothes and Wear":
            return "Одежда";

        case "Home interiors":
            return "Домашние интерьеры";

        case "Computer and Tech":
            return "Компьютер и техника";

        case "Bags and Shoes":
            return "Cумки и Oбувь";

        case "Sports and Outdoor":
            return "Спорт и активный отдых";

        case "Cosmetics":
            return "Косметика";

        case "Self-care products":
            return "Средства по уходу за собой";

        case "More category":
            return "Еще категория";
    }
};
