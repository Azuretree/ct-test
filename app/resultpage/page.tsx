"use client"

import Link from "next/link";
import StyledContent from "../style";
import React from "react";
import styled from "@emotion/styled";
import { useSearchParams } from "next/navigation";

const StartButton = styled.button(() => `
    padding: 12px;
`);

const ResultPage = () => {
    const params = useSearchParams();
    const name = params.get('name');
    const result = params.get('resultMessage');
    const decodedName = name ? decodeURIComponent(name) : '';
    const decodedMessage = result ? decodeURIComponent(result) : '';

    return (
        <StyledContent>
            <div className="contents-container">
                <h1>{decodedName && `${decodedName} 님의 청력 테스트 결과는?`}</h1>
                <h2>{decodedMessage}</h2>
                <p>주파수를 통해 여러분의 귀를 나이별로 분석해봅니다.</p>
                <Link href='/'>
                    <button>다시하기</button>
                </Link>
            </div>
        </StyledContent>
    );
};

export default ResultPage;
