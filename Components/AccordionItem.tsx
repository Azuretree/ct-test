"use client"

import styled from "@emotion/styled";
import { useState } from "react";

const AccordionItemContainer = styled.div(() => `
    width: 100%;
    max-width: 70%;
    margin: 20px auto;
    background-color: #EFEFEF;
    border-radius: 12px;
    padding: 16px;
    transition: .2s all ease;

    & p {
        margin: 10px 0;
        color: #929292;
    }

    @media(max-width: 672px) {
        max-width: 90%;
    }
`);

const AccordionItemHeader = styled.div(() => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`);

const AccordionItemTitle = styled.h3(() => `
    color: #121212;
    margin: 0;
`);

const AccordionItemIcon = styled.div<{ isOpen: boolean }>(
    ({ isOpen }) => `
    width: 24px;
    height: 24px;
    background-color: none;
    transform: ${isOpen ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.3s ease;
`);

const AccordionItemContent = styled.div<{ isOpen: boolean }>(
    ({ isOpen }: { isOpen: boolean }) => `
    text-align: left;
    height: ${isOpen ? "auto" : "0px"};
    overflow: hidden;
    transition: height 0.3s ease;

    & li {
        margin: 10px 0;
        color: #929292;
    }
`);

const TestStandardContainer = styled.div(
    () => `
      width: 100%;
      max-width: 80%;
      background-color: #FFFFFF;
      margin: 20px auto;
      padding: 16px;
      border-radius: 12px;    
      text-align: center;
  
      & h2 {
          margin: 0;
      }
  
      & p {
          margin: 0;
          color: #929292;
          margin: 10px 0;
      }
  
      @media(max-width: 672px) {
          max-width: 90%;
      }
  `
);

export const AccordionItem = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <AccordionItemContainer>
            <AccordionItemHeader onClick={() => setIsOpen(!isOpen)}>
                <AccordionItemTitle>
                    ✔️ 차트 분석하는 법과 기준
                </AccordionItemTitle>
                <AccordionItemIcon isOpen={isOpen} >
                    <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5119 10.2543C9.71431 11.1752 8.28569 11.1752 7.48814 10.2543L1.47364 3.30931C0.351889 2.01402 1.27199 0 2.9855 0L15.0145 0C16.728 0 17.6481 2.01402 16.5264 3.30931L10.5119 10.2543Z" fill="#999999" />
                    </svg>
                </AccordionItemIcon>
            </AccordionItemHeader>
            <AccordionItemContent isOpen={isOpen}>
                <p>이 테스트를 처음 해보시는 분들께 차트 보는 방법을 알려줄게요.😊</p>
                <li>차트의 가로는 각 주파수, 세로는 주파수 테스트할 때 나왔던 버튼들이에요.</li>
                <li>현재 보여지는 차트는 각 주파수 별로 왼쪽은 빨간색 막대가, 오른쪽은 파란색 막대가 한묶음으로 해서 보여주고 있어요.</li>
                <li>해당 주파수에 왼쪽 혹은 오른쪽, 더 나아가 둘다 막대 표시가 안보인다면 본인이 테스트 할 때 "아니요, 잘 안들려요"를 선택한거에요.</li>
                <li>모바일로 차트를 보시려면 가로로 보는 것을 추천해요. 세로에서는 현재 작게 나오는 문제가 있어요.😭</li>
                <p>아래는 차트를 표시하기 위한 점수 기준표에요.</p>
                <TestStandardContainer>
                    <h2>🔸테스트 기준🔸</h2>
                    <p>50점 이상: 10대</p>
                    <p>49점 ~ 41점: 20대</p>
                    <p>40점 ~ 31점: 30대</p>
                    <p>30점 ~ 21점: 40대</p>
                    <p>20점 ~ 11점: 50대</p>
                    <p>10점 ~ 6점: 60대</p>
                    <p>5점 이하: 70대 이상</p>
                </TestStandardContainer>
            </AccordionItemContent>
        </AccordionItemContainer>
    );
}