"use client"

import Link from "next/link";
import StyledContent from "../style";

export const ResultPageComponents = ({ searchParams }: any) => {

    return (
        <StyledContent>
            <div className="contents-container">
                <h1>{searchParams && `${searchParams} 님의 청력 테스트 결과는?`}</h1>
                <h2>{searchParams}</h2>
                <p>주파수를 통해 여러분의 귀를 나이별로 분석해봅니다.</p>
                <Link href='/'>
                    <button>다시하기</button>
                </Link>
            </div>
        </StyledContent>
    );
}