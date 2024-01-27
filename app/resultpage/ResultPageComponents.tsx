"use client"

// ResultPageComponents.tsx

// ResultPageComponents.tsx

import Link from "next/link";
import StyledContent from "../style";
import { useContext } from "react";
import { NameContext } from "@/Components/Main";

export const ResultPageComponents = () => {
    const name = useContext(NameContext);

    console.log(name)

    return (
        <StyledContent>
            <div className="contents-container">
                <h1>{name && `${name} 님의 청력 테스트 결과는?`}</h1>
                <h2>name</h2>
                <p>주파수를 통해 여러분의 귀를 나이별로 분석해봅니다.</p>
                <Link href='/'>
                    <button>다시하기</button>
                </Link>
            </div>
        </StyledContent>
    );
};

