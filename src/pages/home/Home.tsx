import React from "react";
import Tab from "../../components/first-body-components/Tab";
import ItemsList from "../../components/first-body-components/ItemsList";
import QuoteForm from "../../components/first-body-components/QuoteForm";
import Recommended from "../../components/first-body-components/Recommended";
import Services from "../../components/first-body-components/Services";
import Regions from "../../components/first-body-components/Regions";
import AuthenticationRedirect from "../../components/first-body-components/AuthenticationRedirect";

const Home = () => {
    return (
        <div className="flex flex-row">
            <div className="flex flex-col container w-full">
                <AuthenticationRedirect />
                <Tab />
                <Recommended />

                <div className="lg:hidden flex w-[90%] overflow-x-auto overflow-y-hidden invis-scroll px-6">
                    {Array.from(Array(6).keys()).map((e) => (
                        <div
                            key={e}
                            className="w-[400px] h-[200px] flex justify-center items-center bg-green-200 m-4 px-8 rounded"
                        >
                            Reserved for ads
                        </div>
                    ))}
                </div>
                <QuoteForm />
                <Services />
                <Regions />
            </div>
            <div className="lg:flex hidden flex-col">
                {Array.from(Array(6).keys()).map((e) => (
                    <div
                        key={e}
                        className="w-full h-[200px] flex justify-center items-center bg-green-200 m-4 px-8 rounded"
                    >
                        Reserved for ads
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
