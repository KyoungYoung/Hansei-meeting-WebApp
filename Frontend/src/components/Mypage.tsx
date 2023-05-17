import React, { useState } from 'react';
import styled from "styled-components";
import Link from 'next/link';

const Div = styled.div`
`;

const TitleBox = styled.div`
`;

const CategoryBox = styled.div`
  background-color: #F6FFF1;
  display: flex;
  flex-direction: row;
  /* align-items: center;
  justify-content: center; */
  border: solid gray;
  border-radius: 0.5rem;
  margin: 50px;
`;

const CategoryBox2 = styled.div`
  background-color: #F6FFF1;
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  border-radius: 0.5rem;
  margin-left: 100px;
`;
const CategoryBox3 = styled.div`
  background-color: #F6FFF1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;

`;

const ImageBox = styled.div`
  margin: 30px;
`;

const MyTitle = styled.h2` 
  margin-left: 40px;
  font-size: 2.1rem;
  margin-top: 60px;
  display: flex;
`;

const Content = styled.p`
`;

const RequestButton = styled.button`
  font-size: 0.9rem;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Mypage: React.FC = () => {
  return (
    <Div>
      <TitleBox>
        <MyTitle>마이페이지</MyTitle>
      </TitleBox>
        <CategoryBox>
          <CategoryBox2>
            <Content>이름</Content>
            <Content>아이디</Content>
            <Content>학과</Content>
            <RequestButton>정보 변경</RequestButton>
          </CategoryBox2>
          <CategoryBox3>
          <ImageBox>사진</ImageBox>
          </CategoryBox3>
         
          
        </CategoryBox>
        
    </Div>
  );
};

export default Mypage;
