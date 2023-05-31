import React, { useState } from 'react';
import styled from "styled-components";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { type } from 'os';




const Div = styled.div` /*큰 틀*/
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin: 5px;
 margin-left: 100px;
 margin-right: 100px;
 height:100%;
`;

const TitleBox = styled.div` /*mytitle을 감싸는 레이아웃*/
width: 250px;
`;

const CategoryBox = styled.div`/*categorybox2, 3를 감싸는 레이아웃*/
  background-color: #F6FFF1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: solid gray;
  border-radius: 0.5rem;
  margin: 10px;
  margin-left: 20px;
  padding: 20px;
  height: 500px;
  width: 800px;
`;

const CategoryBox2 = styled.div` /* content의 레이아웃*/
  background-color: #F6FFF1;
  flex-direction: column;
  border-radius: 0.5rem;
  margin-right: 90px;
`;
const CategoryBox3 = styled.div`  /* image의 레이아웃*/
 height: 66%;
 display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 50px;
`;

const CategoryBox4 = styled.div` /*button의 레이아웃*/
background-color: #F6FFF1;
  display: flex;
  /* align-items: center; */
  /* justify-content: center;  */
  border-radius: 0.5rem;
  margin-top: 10px;
  
  
`;

const ContentContainer = styled.div` /*content 타이틀과 글을 담고 있는 레이아웃*/
  background-color: #F6FFF1;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 10px;
`;



const ContentText = styled.p` /*content안의 글*/
  margin-bottom: 5px;
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const ContentTitle = styled.h3` /*내정보*/
  font-size: 1.5rem;
  margin-bottom: 40px;
`;

const ImageBox = styled.div` /*사진 넣는 곳*/
border: solid black;
margin-bottom: 10px;

`;

const Image = styled.img` /*사진*/
  width: 134.4px;
  height: 153.3px;
  margin-right: 12px;
  margin-left: 12px;
`;

const MyTitle = styled.h2` /*마이페이지*/
  margin-left: 40px;
  font-size: 2.1rem;
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  
`;


type Content = { /*이름, 학과, 아이디 타입지정*/
name: string;
id: string;
major: string;
grade: number;
no: number;
};

const Contents: Content[] = [
  {
    name:'홍길동',
    id: 'Hong1234',
    major: 'ict',
    grade: 4,
    no: 123456789
  },
]

const RequestButton = styled.button` /*정보변경 버튼*/
  width: 100%;
  font-size: 1rem;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;


const Mypage = ({data}:{data:Content[]}) => {
  const router = useRouter();
  const majorname = router.query.Mypage;
  
  return (
       <Div>
      <TitleBox>
        <MyTitle>마이페이지</MyTitle>
      </TitleBox>
        <CategoryBox>
          <CategoryBox2>
          {data.map((content, index) => (
            <ContentContainer key={index}>
              <ContentTitle>내 정보</ContentTitle>
              <ContentText>이름: {content.name}</ContentText>
              <ContentText>아이디: {content.id}</ContentText>
              <ContentText>학과:{majorname}</ContentText>
              <ContentText>학년: {content.grade}</ContentText>
              <ContentText>학번: {content.no}</ContentText>
            </ContentContainer>
          ))}
          
          </CategoryBox2>
          <CategoryBox3>
          <ImageBox>
            <Image src="/meow.png" />
            </ImageBox>
            <CategoryBox4>
            <Link href = {'/a'}><RequestButton>정보 변경</RequestButton>
            </Link>
            </CategoryBox4>
          </CategoryBox3>
        </CategoryBox>
        
    </Div>
    
  );
  };
  export const getServerSideProps
 = async () => {
  //const res = await fetch('https://api.github.com/repos/vercel/next.js');
  //const repo = await res.json();
  return { props: {data: Contents} };
};

export default Mypage;