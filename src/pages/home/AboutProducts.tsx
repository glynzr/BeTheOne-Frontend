import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Paragraph from "../../components/about-company-components/Paragraph";
import { LanguageType } from "../../store/language";
import { translateCategory } from "../../utils/category_translate";

const AboutProducts = () => {
    const { language } = useSelector(
        (state: { commonReducers: { language: LanguageType } }) =>
            state.commonReducers.language
    );

    const { id } = useParams();
    return (
        <div className="flex flex-col mx-auto w-4/5 p-4">
            <div className="font-bold text-2xl">Be the One Brand</div>

            <Paragraph>
                {language === "US"
                    ? "Be the one is a shop selling many products which you can need."
                    : "Be the One фирма"}
            </Paragraph>

            <Paragraph>
                {language === "US"
                    ? "We use services which you have probably used before, such as Stripe Payment API"
                    : "Мы используем сервиси, которые вы, вероятно, использовали раньше, такие как Stripe платежный API"}
            </Paragraph>

            <Paragraph>
                {language === "US"
                    ? "Our products are delivered on time, with good quality"
                    : "Наша продукция доставляется вовремя, с хорошим качеством"}
            </Paragraph>

            <Paragraph>
                {language === "US"
                    ? "Browse our site and order some products"
                    : "Просмотрите наш сайт и закажите некоторые продукты"}
            </Paragraph>

            {id && (
                <Paragraph>
                    {language === "US"
                        ? "We sell customers with " + id + ", with good quality"
                        : "Мы продаем клиентов с " +
                          translateCategory(id) +
                          ", с хорошим качеством"}
                </Paragraph>
            )}
        </div>
    );
};

export default AboutProducts;
