import React from "react";
import { ResultPageComponents } from "./ResultPageComponents";

const ResultPage = ({ searchParams }: any) => {
    return (
        <>
            <p>{searchParams.resultMessage}</p>
            <ResultPageComponents />
        </>
    );
};

export default ResultPage;
