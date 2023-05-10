import React from "react";
import styled from "styled-components";

const TopWrapper = styled.div`
  position: absolute;
  width: 96rem;
  height: 4rem;
  left: 0;
  top: 0;
  background-color: #c3edff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 12rem;
  height: 3rem;
  margin: 0 1.5rem;
  background-color: #f2f2f2;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainButton = styled(ButtonWrapper)`
  width: 24rem;
`;

const ButtonText = styled.span`
  font-size: 1.5rem;
`;

const MainButtonText = styled(ButtonText)`
  font-weight: bold;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const ContentBox = styled.div`
  width: 18.75rem;
  height: 18.75rem;
  background-color: #f6fff1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid gray;
  margin: 1rem;
`;

const WrapperBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const App: React.FC = () => {
  return (
    <>
      <TopWrapper>
        <ButtonWrapper>
          <MainButtonText>신학부</MainButtonText>
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonText>인문사회과학부</ButtonText>
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonText>경영학과</ButtonText>
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonText>관광학과</ButtonText>
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonText>간호학과</ButtonText>
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonText>사회복지학과</ButtonText>
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonText>컴퓨터공학과</ButtonText>
        </ButtonWrapper>
        <MainButton>
          <MainButtonText>요청하기</MainButtonText>
        </MainButton>
      </TopWrapper>
      <CenterWrapper>
        <WrapperBox>
          <ContentBox>박스 1</ContentBox>
          <ContentBox>박스 2</ContentBox>
          <ContentBox>박스 3</ContentBox>
          <ContentBox>박스 4</ContentBox>
        </WrapperBox>
        <ContentBox>박스 5</ContentBox>
      </CenterWrapper>
    </>
  );
};

export default App;
