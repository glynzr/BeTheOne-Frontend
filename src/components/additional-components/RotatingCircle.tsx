import { CirclesWithBar } from "react-loader-spinner";

export const Loader = ({ size }: { size: number }) => {
    return <CirclesWithBar color="lightBlue" height={size} width={size} />;
};
