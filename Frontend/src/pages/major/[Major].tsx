import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const MainBox = styled.div`
  display: flex;
  position: absolute;
  height: 70px;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #DAEEFD;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
`;

const MajorBox = styled.div`
  width: 100px;
  height: 50px;
  background-color: white;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  margin: 85px;
  margin-top: 50px;
  width: 6.875rem;
  height: 2.5rem;
  background-color: #e5f7ff;
  border-radius: 0.9375rem;
  border: none;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
  font-weight: bold;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CategoryBox = styled.div`
  background-color: #F6FFF1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid gray;
  border-radius: 0.5rem;
  margin-right: 30px;
  margin-top: 70px;
  padding-left: 50px;
  padding-right: 50px;
  overflow: auto;
`;

const CategoryContent = styled.div`
  height: 200px; /* Adjust the height to your preference */
  overflow: auto;
`;


const CategoryBox2 = styled.div`
  background-color: #F6FFF1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid gray;
  border-radius: 0.5rem;
  margin-right: 30px;
  margin-top: 70px;
  padding-left: 50px;
  padding-right: 50px;
`;

const InnerBox = styled.div`
  text-decoration-line: none;
  font-size: smaller;
  width: 250px;
  height: 30px;
  background-color: #FFFFF2;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  padding: 3px;
`;

const InnerBox2 = styled(Link)`
  text-decoration-line:none;
  font-size: smaller;
  width: 250px;
  height: 30px;
  background-color: #FFFFF2;
  margin-top: 10px;
  margin-bottom: 10px; /* 각 InnerBox의 아래쪽 간격을 0.5rem으로 설정 */
  border-radius: 15px;
  padding: 3px;
`;

const CategoryTitle = styled.div`
  padding-bottom: 150px;
  font-size: 1.5rem;
  font-weight: bolder;
  margin-top: 10px;
`;

const CategoryTitle2 = styled.div`
  padding-bottom: 55px;
  font-size: 1.5rem;
  font-weight: bolder;
  margin-top: 30px;
`;

const RequestButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const postdata = [
  {
    title: '제목1',
    content: '내용1',
    url: '/제목1'
  },
  {
    title: '제목2',
    content: '내용2',
    url: '/제목2'
  },
  {
    title: '제목3',
    content: '내용3',
    url: '/제목3'
  },
  {
    title: '제목4',
    content: '내용4',
    url: '/제목4'
  },
  {
    title: '제목5',
    content: '내용5',
    url: '/제목5'
  }
];

interface Data {
  title: string;
  content: string;
  url: string;
}

const MajorBoard = ({data}) => {
  const router = useRouter();
  const majorname = router.query.Major;

  return (
    <MainBox>
      <Container>
        <MajorBox>{majorname}</MajorBox>
        <Button>좋아요</Button>
        <Button>별점</Button>
        <Button>후기</Button>
        <Button>요청하기</Button>
        <Button>수락하기</Button>
      </Container>

      <BottomWrapper>
        <CategoryContainer>
        <CategoryBox>
      <CategoryTitle>활동 멤버</CategoryTitle>
      <CategoryContent>
        <InnerBox>정지훈</InnerBox>
        <InnerBox>박동주</InnerBox>
        <InnerBox>변혜림</InnerBox>
        <InnerBox>김경영</InnerBox>
        <InnerBox>지윤식</InnerBox>
        <InnerBox>이찬우</InnerBox>
      </CategoryContent>
      </CategoryBox>
      <CategoryBox2>
          <CategoryTitle2>{majorname} 게시판</CategoryTitle2>
          {data.map((data: Data) => (
          <InnerBox2 href={data.url} key={data.title}>{data.title}</InnerBox2>))}
          <Link href={'/board'}><RequestButton>더보기</RequestButton></Link>
          </CategoryBox2>
        </CategoryContainer>
      </BottomWrapper>
    </MainBox>
  );
};

export const getServerSideProps
 = async () => {
  //const res = await fetch('https://api.github.com/repos/vercel/next.js');
  //const repo = await res.json();
  return { props: {data: postdata } };
};

export default MajorBoard;