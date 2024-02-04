"use client"

// Main.tsx
import Link from "next/link";
import Image from "next/image";
import StyledContent from "@/app/style";
import { useEffect, useState } from "react";
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
    font-size: 14px;
    color: #525252;
    margin: 10px auto;

    input {
        margin-right: 8px;
        appearance: none;
        width: 18px;
        height: 18px;
        border: 1px solid grey;
        border-radius: 10px;
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

const ErrorContainer = styled.div(() => `
    width: 100%;
    max-width: 25vw;
    margin: 20px auto;
    background-color: #FF5C5C;
    color: #FFFFFF;
    font-size: 14px;
    text-align: center;
    padding: 8px;
    border-radius: 12px;

    & svg {
        position: relative;
        top: 2px;
        width: 18px;
        height: 16px;
        margin-right: 8px;
    }

    @media(max-width: 672px) {
        max-width: 65vw;
    }
`);

export const Main = () => {
    const [name, setName] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // 이름이 변경될 때마다 실행되는 부분
        if (name.trim() !== '') {
            setChecked(false);
            setError('');
        }
    }, [name]);

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
                            setError('ErrorMessage: 이름을 입력해주세요.');
                            setChecked(false);
                        } else if (name.trim() !== '') {
                            // 에러 메시지 초기화
                            setError('');
                        }
                    }}
                />
                위 주의사항을 읽었으며, 테스트를 시작할게요.
            </CheckboxLabel>
            {error &&
                <ErrorContainer>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.19914 1C7.96894 -0.333333 9.89344 -0.333333 10.6632 1L17.5914 13C18.3612 14.3333 17.399 16 15.8594 16H2.00298C0.463383 16 -0.498867 14.3333 0.270933 13L7.19914 1ZM7.93119 5.5C7.93119 4.94771 8.3789 4.5 8.93119 4.5C9.48347 4.5 9.93119 4.94771 9.93119 5.5V9.5C9.93119 10.0523 9.48347 10.5 8.93119 10.5C8.3789 10.5 7.93119 10.0523 7.93119 9.5V5.5ZM8.93119 11.5C8.3789 11.5 7.93119 11.9477 7.93119 12.5C7.93119 13.0523 8.3789 13.5 8.93119 13.5C9.48347 13.5 9.93119 13.0523 9.93119 12.5C9.93119 11.9477 9.48347 11.5 8.93119 11.5Z" fill="white" />
                    </svg>
                    {error}
                </ErrorContainer>
            }
            <StartBtnContainer>
                <Link href={{
                    pathname: "/testpage",
                    query: { name: encodeURIComponent(name) }
                }}>
                    <StartButton
                        disabled={name.trim() === '' || !checked}
                        enabled={name.trim() !== '' && checked}
                    >
                        시작하기
                    </StartButton>
                </Link>
            </StartBtnContainer>
        </StyledContent>
    );
};
