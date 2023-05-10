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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #C3EDFF;
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
  cursor: pointer;
`;

const Main: React.FC = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department);
    window.open(`https://example.com/${department}`, '_blank');
  };

  return (
    <MainContainer>
      <TopBox>
        <ButtonWrapper onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
          신학부
          <SubMenu className="submenu" isOpen={subMenuOpen}>
            <SubMenuList>
              <SubMenuItem onClick={() => handleDepartmentClick('신학과')}>신학과</SubMenuItem>
              <SubMenuItem onClick={() => handleDepartmentClick('기독교교육·상담학과')}>기독교교육·상담학과</SubMenuItem>
            </SubMenuList>
          </SubMenu>
        </ButtonWrapper>

        <ButtonWrapper onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
          인문사회과학부
          <SubMenu className="submenu" isOpen={subMenuOpen}>
            <SubMenuList>
              <SubMenuItem onClick={() => handleDepartmentClick('미디어영상광고학과')}>미디어영상광고학과</SubMenuItem>
              </SubMenuList>
              </SubMenu>
              </ButtonWrapper>
            </TopBox>
            </MainContainer>
        
    );
};

export default Main;
