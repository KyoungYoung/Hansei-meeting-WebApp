import React, { useState }  from 'react';
import styled from "styled-components";
import Link from 'next/link';

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
 width: 90px;
  height: 90px;
  margin-right: 12px;
  margin-left: 12px;
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



const Header: React.FC = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);


  return (
    <MainContainer>
      <TopBox>
      <Link href = {'/a'}><Logo src="daa.png" /></Link>
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
    </MainContainer>
  );
};

export default Header;