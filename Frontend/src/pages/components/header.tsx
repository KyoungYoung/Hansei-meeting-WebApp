import React, { useState }  from 'react';
import styled from 'styled-components';

const Topbox = styled.div`

position: absolute;
width: 96rem;
height: 64px;
left: 0;
top: 0;
background-color: #ACE6FF;

display: flex;
justify-content: flex-start;
align-items: center;

&::after {
  content: '';
  width: 2px;
  height: 64px;
  margin-left: 10px;
  background-color: #C3EDFF;
}

&::before {
  content: '요청하기';
  position: absolute;
  right: 5.8rem;
  top: -6.2%;
  transform: translateY(50%);
  width: 6.875rem;
  height: 3rem;
  background-color: #C3EDFF;
  border-radius: 0.9375rem;
  border: none;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  // cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

`;

const Logo = styled.img`
  width: 3.125rem;
  height: 3.125rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const ButtonWrapper = styled.div`
margin: 0 1rem;
display: flex;
justify-content: center;

`;


const Button = styled.button`
margin: 0 1rem;
width: 129px;
height: 3rem;
background-color: #E5F7FF;
border-radius: 0.9375rem;
border: none;
box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
cursor: pointer;
font-size: 0.9rem;
font-weight: bold;
`;


interface TopBoxProps {
  onDepartmentClick: (departmentName: string) => void;
}

function TopBox({ onDepartmentClick }: TopBoxProps) {
  const [department, setDepartment] = useState<string | null>();

  const handleDepartmentClick = (departmentName: string) => {
    setDepartment(departmentName);
    onDepartmentClick(departmentName);
  };

  return (
    <div>
    <Topbox>
      <Logo src="/daa.png.png" alt="로고"/>
      <ButtonWrapper>
      {[
            '신학부', '인문사회과학부', 'IT학부', '간호복지학부',
            '예술학부', '디자인학부', '계약학과'
          ].map((departmentName, index) => (
            <Button key={index} onClick={() => handleDepartmentClick(departmentName)}>
              {departmentName}
            </Button>
          ))}
      </ButtonWrapper>
    </Topbox>
    </div>
  );
}


export default TopBox;