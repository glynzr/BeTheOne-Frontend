import Title from "../additional-components/Title";
import React, { useEffect, useState } from "react";
import regions from "api/regions.json";
import ReactCountryFlag from "react-country-flag";
import { Region } from "../../interfaces/regions";
import axios from "../../services/axios.interceptor";
import { EndpointBuilder } from "../../utils/endpoint_builder";
const Regions = () => {
    const [regions, setRegions] = useState<Region[]>([]);

    const url = new EndpointBuilder()
        .addPersistentParam("product")
        .addPersistentParam("regions")
        .build();

    useEffect(() => {
        const fetchRegions = () => {
            axios
                .get<Region[]>(url)
                .then(({ data }) => setRegions(data))
                .catch((error) => {
                    console.error(error);
                });
        };
        fetchRegions();
    }, [url]);

    return (
        <div className="flex flex-col gap-y-6 mb-5 mx-auto w-[90%]">
            <Title>Suppliers by region</Title>
            <div className="sm:grid sm:grid-cols-3 sm:gap-x-[18px] sm:gap-y-[10px] grid grid-cols-2">
                {regions.map((region) => (
                    <div key={region.id} className="flex items-center gap-x-4">
                        <ReactCountryFlag
                            countryCode={region.code}
                            svg={true}
                            style={{
                                width: 28,
                                height: 20,
                            }}
                        />
                        <div className="flex flex-col">
                            <p>{region.country}</p>
                            <p className="text-gray-400 text-[13px]">
                                {region.website}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Regions;
