"use client"

// Main.tsx
import Link from "next/link";
import Image from "next/image";
import StyledContent from "@/app/style";
import { createContext, useContext, useState } from "react";
import styled from "@emotion/styled";

export const StartButton = styled.button<{ enabled: boolean }>(({ enabled }) => `
    width: 100%;
    padding: 14px;
    background-color: ${enabled ? '#0075FF' : '#ACCFF8'};
    color: #FFFFFF;
    cursor: ${enabled ? 'pointer' : 'not-allowed'};
    border-radius: 12px;
    border: none;
    font-weight: bold;
    font-size: 14px;
    transition: .2s all ease;
`);

export const StartBtnContainer = styled.div(() => `
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
`)

export const NameInput = styled.input(() => `
    width: 100%;
    max-width: 30%;
    margin: 14px auto;
    padding: 16px;
    border-radius: 12px;
    background-color: #E0E0E0;
    border: none;
    outline: none;
    font-size: 16px;
    text-align: center;

    @media(max-width: 672px) {
        max-width: 60%;
    }
`);

export const InfoContainer = styled.div(() => `
    width: 100%;
    max-width: 50%;
    background-color: #E3E3E3;
    margin: 20px auto;
    padding: 16px;
    border-radius: 12px;

    & h2 {
        text-align: left;
        margin-top: 0;
    }

    & li {
        text-align: left;
    }

    @media(max-width: 672px) {
        max-width: 90%;
    }
`);

export const Main = () => {
    const [name, setName] = useState<string>('');
    const [enabled, setEnabled] = useState<boolean>(false);

    const handleStartButtonClick = () => {
        setEnabled(true);
    };

    return (
        <StyledContent>
            <Image src='/ct-logo.png' width={180} height={180} alt={""} className="main-logo" />
            <h1>나의 청력은 얼마나 좋을까?</h1>
            <p>주파수를 통해 여러분의 귀를 나이별로 분석해줄거에요.</p>
            <NameInput
                type="text"
                placeholder="이름을 입력하세요."
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setEnabled(e.target.value.trim() !== '');
                }}
            />
            <StartBtnContainer>
                <Link href={{
                    pathname: "/testpage",
                    query: { name: encodeURIComponent(name) }
                }}>
                    <StartButton disabled={name.trim() === ''} enabled={enabled} onClick={handleStartButtonClick}>
                        시작하기
                    </StartButton>
                </Link>
            </StartBtnContainer>
            <InfoContainer>
                <h2>테스트 하기 전, 확인해주세요!</h2>
                <li>이 사이트는 전문 의료용이 아닌 단순 재미를 위해 만들어졌어요. 과몰입에 주의해주세요!</li>
                <li>이름을 입력 후 시작하기 버튼을 누르시면 주파수 별로 왼쪽, 오른쪽 귀를 번갈아가며 테스트할거에요.</li>
                <li>정상적이지 않은 방법으로 사이트 접근시도 시 사이트 내에서 감지하여 다시 홈으로 돌아와요.</li>
            </InfoContainer>
        </StyledContent>
    );
};
