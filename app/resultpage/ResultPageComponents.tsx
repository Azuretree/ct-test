"use client"

import Link from "next/link";
import StyledContent from "../style";
import { Bar } from "react-chartjs-2";

export const ResultPageComponents = ({ testerName, resultMessage, scores, frequencies }: {
    testerName: string,
    resultMessage: string,
    scores: number[],
    frequencies: string[],
}) => {
    return (
        <StyledContent>
            <div className="contents-container">
                <h1>{`${testerName} 님의 청력 테스트 결과는?`}</h1>
                <h2>{resultMessage}</h2>
                <p>주파수를 통해 여러분의 귀를 나이별로 분석해봅니다.</p>

                {/* 차트 */}

                <Link href='/'>
                    <button>다시하기</button>
                </Link>
            </div>
        </StyledContent>
    );
};


