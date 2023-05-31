import React, { useState }  from 'react';
import styled from 'styled-components';

const Box = styled.div`
position: absolute;
width: 96rem;
height: 4rem;
left: 0;
top: 0;
background-color: #C3EDFF;

display: flex;
justify-content: flex-start;
align-items: center;
`;

const Logo = styled.img`
  width: 3.125rem;
  height: 3.125rem;
  margin-right: 1rem;
`;

const Button = styled.button`
margin: 0 0.5rem;
width: 6.875rem;
height: 2.5rem;
background-color: #E5F7FF;
border-radius: 0.9375rem;
border: none;
box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
cursor: pointer;
`;


interface TopBoxProps {
  onDepartmentClick: (departmentName: string) => void;
}

function TopBox({ onDepartmentClick }: TopBoxProps) {
  const [department, setDepartment] = useState<string | null>(null);

  const handleDepartmentClick = (departmentName: string) => {
    setDepartment(departmentName);
    onDepartmentClick(departmentName);
  };

  return (
    <Box>
      <Logo src="Frontend\src\pages\main\meow.png" />
      <Button onClick={() => handleDepartmentClick('신학부')}>신학부</Button>
      <Button onClick={() => handleDepartmentClick('인문사회과학부')}>
        인문사회과학부
      </Button>
      <Button onClick={() => handleDepartmentClick('IT학부')}>IT학부</Button>
      <Button onClick={() => handleDepartmentClick('간호복지학부')}>
        간호복지학부
      </Button>
      <Button onClick={() => handleDepartmentClick('예술학부')}>예술학부</Button>
      <Button onClick={() => handleDepartmentClick('디자인학부')}>
        디자인학부
      </Button>
      <Button onClick={() => handleDepartmentClick('계약학과')}>
        계약학과
      </Button>
      <Button onClick={() => handleDepartmentClick('요청하기')}>
        요청하기
      </Button>
    </Box>
  );
}
export default TopBox;



