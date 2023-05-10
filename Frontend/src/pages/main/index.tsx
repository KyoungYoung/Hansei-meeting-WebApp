import React, { useState }  from 'react';
import styled from "styled-components";

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
  height: 100vh;
`;

const TopBox = styled.div`
  position: absolute;
  width: 1519.5px;
  height: 70px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #DAEEFD;
`;

const Logo = styled.img`
  width: 3.125rem;
  height: 3.125rem;
  margin-right: 1rem;
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
  height: 500px;
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

const InnerBox = styled.div`
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

const InnerBox4 = styled.div`
font-size: smaller;
  width: 200px;
  height: 2rem;
  background-color: #FFFFF2;
  margin-top: 1rem;
  margin-bottom: 0.5rem; 
  padding: 3px;

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
`;

const Main: React.FC = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);


  return (
    <MainContainer>
      <TopBox>
      <Logo src="Frontend\src\pages\main\meow.png" />
        <ButtonWrapper onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
          신학부
          <SubMenu className="submenu" isOpen={subMenuOpen}>
            <SubMenuList>
            <SubMenuItem>신학과</SubMenuItem>
            <SubMenuItem>기독교교육·상담학과</SubMenuItem>
            </SubMenuList>
          </SubMenu>
          </ButtonWrapper>
          <ButtonWrapper onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
          인문사회과학부
          <SubMenu className="submenu" isOpen={subMenuOpen}>
            <SubMenuList>
            <SubMenuItem>미디어영상광고학과</SubMenuItem>
            <SubMenuItem>경영학과</SubMenuItem>
            <SubMenuItem>경찰행정학과</SubMenuItem>
            <SubMenuItem>국제관광학과</SubMenuItem>
            <SubMenuItem>영어학과</SubMenuItem>
            <SubMenuItem>중국어학과</SubMenuItem>
            </SubMenuList>
          </SubMenu>
          </ButtonWrapper>
          <ButtonWrapper onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
          IT학부
          <SubMenu className="submenu" isOpen={subMenuOpen}>
            <SubMenuList>
            <SubMenuItem>컴퓨터공학과</SubMenuItem>
            <SubMenuItem>ICT융합학과</SubMenuItem>
            <SubMenuItem>산업보안학과</SubMenuItem>
            </SubMenuList>
          </SubMenu>
          </ButtonWrapper>
          <ButtonWrapper onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
          간호복지학부
          <SubMenu className="submenu" isOpen={subMenuOpen}>
            <SubMenuList>
            <SubMenuItem>간호학과</SubMenuItem>
            <SubMenuItem>사회복지학과</SubMenuItem>
            </SubMenuList>
          </SubMenu>
          </ButtonWrapper>
          <ButtonWrapper onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
          예술학부
          <SubMenu className="submenu" isOpen={subMenuOpen}>
            <SubMenuList>
            <SubMenuItem>음악학과</SubMenuItem>
            <SubMenuItem>공연예술학과</SubMenuItem>
            </SubMenuList>
          </SubMenu>
          </ButtonWrapper>
          <ButtonWrapper onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
          디자인학부
          <SubMenu className="submenu" isOpen={subMenuOpen}>
            <SubMenuList>
            <SubMenuItem>시각정보디자인학과</SubMenuItem>
            <SubMenuItem>실내건축디자인학과</SubMenuItem>
            <SubMenuItem>섬유패션디자인학과</SubMenuItem>
            </SubMenuList>
          </SubMenu>
          </ButtonWrapper>
          <ButtonWrapper onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
          계약학과
          <SubMenu className="submenu" isOpen={subMenuOpen}>
            <SubMenuList>
            <SubMenuItem>보건복지 사회적기업학과</SubMenuItem>
            <SubMenuItem>보건융합 사회적경제학과</SubMenuItem>
            <SubMenuItem>스마트콘텐츠마케팅학과</SubMenuItem>
            </SubMenuList>
          </SubMenu>
          </ButtonWrapper>
        <ButtonWrapper>요청하기</ButtonWrapper>
        </TopBox>

      <BottomWrapper>
        <CategoryBox>
        <CategoryTitle> 자유게시판 </CategoryTitle>
        <InnerBox>내일 저녁에 농구하실 분</InnerBox>
        <InnerBox>집으로 순간이동 하고 싶다</InnerBox>
        <InnerBox>투자론 과제 어떻게 하는지 아는 사람ㅠ</InnerBox>
        <InnerBox>오늘 저메추 해쥬라</InnerBox>
        <InnerBox>종강하고 싶은 사람 좋아요 박고 가</InnerBox>
        <InnerBox>다들 mbti 머야?</InnerBox>
        <InnerBox>낼 과팅하는데 옷 어캐 입어야 할깡</InnerBox>
        <InnerBox>과팅 해본 사람 후기 좀~.~</InnerBox>
        <RequestButton>더보기</RequestButton>
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
        <InnerBox3>⭐ ict융합학과</InnerBox3>
        <InnerBox3>⭐ 컴퓨터공학과</InnerBox3>
        </CategoryBox3>

        <CategoryBox4>
        <CategoryTitle3> 활동순 </CategoryTitle3>
        <InnerBox4>변혜림</InnerBox4>
        <InnerBox4>박동주</InnerBox4>
        <InnerBox4>정지훈</InnerBox4>
        </CategoryBox4>
        </TwoBox>
      </BottomWrapper>
    </MainContainer>
  );
};

export default Main;