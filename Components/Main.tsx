"use client"

// Main.tsx
import Link from "next/link";
import Image from "next/image";
import StyledContent from "@/app/style";
import { useState } from "react";
import styled from "@emotion/styled";

const StartButton = styled.button<{ enabled: boolean }>(({ enabled }) => `
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

const StartBtnContainer = styled.div(() => `
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
`)

const NameInput = styled.input(() => `
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

const InfoContainer = styled.div(() => `
    width: 100%;
    max-width: 50%;
    background-color: #EFEFEF;
    margin: 20px auto;
    padding: 16px;
    border-radius: 12px;

    & h2 {
        text-align: left;
        margin-top: 0;
    }

    & li {
        margin: 10px 0;
        text-align: left;
        color: #929292;
    }

    @media(max-width: 672px) {
        max-width: 90%;
    }
`);

const CheckboxLabel = styled.label(() => `
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    color: #525252;
    margin: 20px auto;

    input {
        margin-right: 8px;
        appearance: none;
        width: 16px;
        height: 16px;
        border: 1px solid grey;
        border-radius: 4px;
        cursor: pointer;
        outline: none;
        transition: border-color 0.3s ease;

        &:checked {
            background-color: #0075FF;
            border-color: #0075FF;
        }

        &:checked::before {
            content: '\\2713';
            display: block;
            color: white;
            font-size: 12px;
            line-height: 16px;
            text-align: center;
        }
    }
`);

export const Main = () => {
    const [name, setName] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);

    const handleStartButtonClick = () => {
        setChecked(true);
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
                    if (name.trim() !== '' && checked) setChecked(false);
                }}
            />
            <InfoContainer>
                <h2>테스트 하기 전, 확인해주세요!</h2>
                <li>이 사이트는 전문 의료용이 아닌 단순 재미를 위해 만들어졌어요. 과몰입에 주의해주세요!</li>
                <li>이름을 입력 후 시작하기 버튼을 누르시면 주파수 별로 왼쪽, 오른쪽 귀를 번갈아가며 테스트할거에요.</li>
                <li>청력 테스트이기 때문에 헤드폰 혹은 이어폰 착용 후 테스트에 참여하는 것을 추천해요.</li>
                <li>정상적이지 않은 방법으로 사이트 접근시도 시 사이트 내에서 감지하여 다시 홈으로 돌아와요.</li>
            </InfoContainer>
            <CheckboxLabel htmlFor="customCheckbox">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        if (name.trim() === '') {
                            alert('이름을 입력해주세요.');
                            setChecked(false);
                        }
                    }}
                />
                위 주의사항을 읽었으며, 테스트를 시작할게요.
            </CheckboxLabel>
            <StartBtnContainer>
                <Link href={{
                    pathname: "/testpage",
                    query: { name: encodeURIComponent(name) }
                }}>
                    <StartButton
                        disabled={name.trim() === '' || !checked}
                        enabled={name.trim() !== '' && checked}
                        onClick={handleStartButtonClick}
                    >
                        시작하기
                    </StartButton>
                </Link>
            </StartBtnContainer>
        </StyledContent>
    );
};
