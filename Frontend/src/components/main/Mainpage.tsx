import React, { useState }  from 'react';
import styled from "styled-components";
import Link from 'next/link';
import Image from 'next/image';
import Sublist from './Sublist';
import Sublist2 from './Sublist2';

interface SubMenuProps {
  isOpen: boolean;
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color:#F6FEFF;
`;

const TwoBox = styled.div` /*CategoryBox3, 4 묶음*/
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopBox = styled.div`
  position: absolute;
  width: 100%;
  height: 70px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #DAEEFD;
`;

const Logo = styled(Image)`
  margin-left: 30px;
`;

const ButtonWrapper = styled.div`
  margin: 0 0.5rem;
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
  position: relative;

  &:hover {
    .submenu {
      display: block;
    }
  }
`;

const SubMenu = styled.div<SubMenuProps>`
  position: absolute;
  top: 2.5rem;
  left: 0;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  z-index: 1;
  padding: 0.5rem;
  background-color: #F5FEFF;
`;

const SubMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubMenuItem = styled.li`
  font-size: 0.85rem;
  padding: 0.25rem 0;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const CategoryBox = styled.div`
  background-color: #F6FFF1;
  height: 687px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid gray;
  border-radius: 0.5rem;
  margin-right: 3rem;
  margin-top: 70px;
  padding-left: 50px;
  padding-right: 50px;
  `;
 
const CategoryBox2 = styled.div`
  width: 18.75rem;
  height: 20.75rem;
  background-color: #F6FFF1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid gray;
  border-radius: 0.5rem;
  margin-right: 3rem;
  margin-top: 70px;
`;

 const CategoryTitle1 = styled.div`
    padding-bottom: 55px;
    font-size: 1.5rem;
    font-weight: bolder;
  `;

const CategoryBox3 = styled.div`
  width: 18.75rem;
  height: 20.75rem;
  background-color: #F6FFF1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid gray;
  border-radius: 0.5rem;
  margin-right: 3rem;
  margin-top: 70px;
`;

const CategoryTitle2 = styled.div`
    padding-bottom: 55px;
    font-size: 1.5rem;
    font-weight: bolder;
  `;

const CategoryBox4 = styled.div`
  width: 18.75rem;
  height: 20.75rem;
  background-color: #F6FFF1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid gray;
  border-radius: 0.5rem;
  margin-right: 3rem;
  margin-top: 50px;
`;

const CategoryTitle3 = styled.div`
    padding-bottom: 55px;
    font-size: 1.5rem;
    font-weight: bolder;
  `;

const InnerBox = styled(Link)`
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

const InnerBox2 = styled.div`
  font-size: smaller;
  width: 250px;
  height: 25px;
  background-color: #FFFFF2;
  margin-top: 10px;
  margin-bottom: 30px;
   border-bottom: 1px solid black;
   border-radius: 5px;
`;

const InnerBox3 = styled.div`
font-size: smaller;
  width: 15.5rem;
  height: 2rem;
  background-color: #FFFFF2;
  margin-top: 1rem;
  margin-bottom: 0.5rem; 
`;

const InnerBox4 = styled(Link)<{width?:number}>`
  text-decoration-line:none;
  color: inherit;
  font-size: smaller;
  height: 2rem;
  background-color: #FFFFF2;
  margin-top: 1rem;
  margin-bottom: 0.5rem; 
  padding: 3px;
  width:${(props) => props.width? props.width+'px' : '200px'};
`;

const CategoryTitle = styled.h2`
  margin-bottom: 1rem;
`;

const RequestButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-decoration: none;
`;

//
const LoginContainer = styled.div`
  display: block;
  width:150px;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  background-color: #DAEEFD;
  a {text-decoration: none;};
`;

const Username = styled.span`
  font-size: 14px;
  margin-left: 10px;
  word-break:keep-all;
  color:black;
  text-decoration: none;
`;

const LoginButton = styled.button`
  padding: 10px;
  font-weight:600;
  box-sizing:border-box;
  color:green;
  word-break:keep-all;
  background-color: transparent;
  border: none;
  
`;

//

const frontdata = [
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
  },
  {
    title: '제목6',
    content: '내용6',
    url: '/제목6'
  },
  {
    title: '제목7',
    content: '내용7',
    url: '/제목7'
  },
  {
    title: '제목8',
    content: '내용8',
    url: '/제목8'
  },
  {
    title: '제목9',
    content: '내용9',
    url: '/제목9'
  },
  {
    title: '제목10',
    content: '내용10',
    url: '/제목10'
  },
]

interface DummyData { //타입지정
  title: string;
  content: string;
  url: string;
}

const majorlist = [
  { name : '신학과'},
  { name : '기독교교육상담학과'}
]

const majorlist2 = [
  {name : '미디어영상광고학과'},
  {name : '경영학과'},
  {name : '경찰행정학과'},
  {name : '국제관광학과'},
  {name : '영어학과'},
  {name : '중국어학과'}
]

const majorlist3 = [
  {name : '컴퓨터공학과'},
  {name : 'ICT융합학과'},
  {name : '산업보안학과'}
]

const majorlist4 = [
  {name : '간호학과'},
  {name : '사회복지학과'}
]

const majorlist5 = [
  {name : '음악학과'},
  {name : '공연예술학과'}
]

const majorlist6 = [
  {name : '시각정보디자인학과'},
  {name : '실내건축디자인학과'},
  {name : '섬유패션디자인학과'}
]

const majorlist7 = [
  {name : '보건복지 사회적기업학과'},
  {name : '보건융합 사회적경제학과'},
  {name : '스마트콘텐츠마케팅학과'}
]

const Mainpage: React.FC = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const username ="테스트이름";

  const handleLogout = () => {
    setIsLoggedIn(!isLoggedIn)
  };

  const handleLogin=()=>{
    setIsLoggedIn(!isLoggedIn)
  }


  return (
    <MainContainer>
      <TopBox>
      <Link href={'/a'}><Logo width={75} height={75} alt='' src="/logo2.png" /></Link>
       <Sublist2 title={majorlist} menuName={'신학부'} />
       <Sublist2 title={majorlist2} menuName={'인문사화과학부'} />
       <Sublist2 title={majorlist3} menuName={'IT학부'} />
       <Sublist2 title={majorlist4} menuName={'간호복지학부'} />
       <Sublist2 title={majorlist5} menuName={'예술학부'} />
       <Sublist2 title={majorlist6} menuName={'디자인학부'} />
       <Sublist2 title={majorlist7} menuName={'계약학과'} />
        <ButtonWrapper>요청하기</ButtonWrapper>
        <LoginContainer>
          {isLoggedIn && (
            <>
              <Link href={'/mypage'}><Username>{username}</Username></Link>
              <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
            </>
          )}
          {!isLoggedIn && <LoginButton onClick={handleLogin}>로그인</LoginButton>}
        </LoginContainer>
        </TopBox>

      <BottomWrapper>
        <CategoryBox>
        <CategoryTitle> 자유게시판 </CategoryTitle>
        {frontdata.map((data)=> <InnerBox href={data.url}>{data.title}</InnerBox>)}
        <Link href={'/board'}><RequestButton>더보기</RequestButton></Link>
        </CategoryBox>

        <CategoryBox2>
        <CategoryTitle1> 오늘의 일정 </CategoryTitle1>
        <InnerBox2>✔ 투자론 6주차 과제 제출</InnerBox2>
        <InnerBox2>✔ 지도교수님 상담</InnerBox2>
        <InnerBox2>✔ 비교과프로그램 수강</InnerBox2>
        </CategoryBox2>

      <TwoBox>
        <CategoryBox3>
        <CategoryTitle2> 별점순 </CategoryTitle2>
        <InnerBox3>⭐ 경영학과</InnerBox3>
        <InnerBox3>⭐ ICT융합학과</InnerBox3>
        <InnerBox3>⭐ 컴퓨터공학과</InnerBox3>
        </CategoryBox3>

        <CategoryBox4>
        <CategoryTitle3> 활동순 </CategoryTitle3>
        <InnerBox4 width={200} href={'/a'}>변혜림</InnerBox4>
        <InnerBox4 width={200} href={'/a'}>박동주</InnerBox4>
        <InnerBox4 width={200} href={'/a'}>정지훈</InnerBox4>
        </CategoryBox4>
        </TwoBox>
      </BottomWrapper>
    </MainContainer>
  );
};

export default Mainpage;