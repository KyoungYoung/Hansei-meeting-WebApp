import React, { useState } from 'react';
import styled from 'styled-components';

interface SubMenuProps {
  isOpen: boolean;
}

const MainContainer = styled.div`
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
  background-color: #c3edff;
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
  background-color: #fff;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  z-index: 1;
  padding: 0.5rem;
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
              <SubMenuItem>기독교교육학과</SubMenuItem>
              <SubMenuItem>심리치료학과</SubMenuItem>
            </SubMenuList>
          </SubMenu>
          </ButtonWrapper>
          </TopBox>
          </MainContainer>
          );
};

export default Main;
