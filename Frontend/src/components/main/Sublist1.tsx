import React, { useState }  from 'react';
import styled from "styled-components";
import Link from 'next/link';
import Image from 'next/image';

interface SubMenuProps {
    isOpen: boolean;
  }

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

const SubMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubMenuItem = styled.li`
  font-size: 0.85rem;
  padding: 0.25rem 0;
`;

function Sublist1() {
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    return ( <ButtonWrapper onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
    신학부
    <SubMenu className="submenu" isOpen={subMenuOpen}>
      <SubMenuList>
      <SubMenuItem>신학과</SubMenuItem>
      <SubMenuItem>기독교교육·상담학과</SubMenuItem>
      </SubMenuList>
    </SubMenu>
    </ButtonWrapper>
 );
}

export default Sublist1;