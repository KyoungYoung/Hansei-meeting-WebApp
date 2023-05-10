import Link from 'next/link';
import { ReactElement, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f3f4;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  margin-bottom: 32px;
  font-size: 4rem;
`;


const Field = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #bec3c7;
  border-radius: 4px;
`;

const LoginButton = styled.button`
  background-color: #000000;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1a73e8;
  }
`;

const PageLinkText = styled.a`
  color: #808080;
  font-size:0.8rem;
  padding:12px;
  text-decoration:none;
`;

const LoginButtonWrap=styled.div`
  display:flex;
  justify-content:space-around;
  border:1px;

`

type handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>void
interface LoginProps {
  onSubmit: (username: string, password: string) => void;
}

function Login() {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('')
    const handleId:handleChange =(event) => {
        setUserid(event.currentTarget.value);
      };
    const handlePassword:handleChange =(event) => {
        setPassword(event.currentTarget.value);
    };
    const onSubmit =(data:any)=>{
        
    }
  return (
    <Container>
        <Title>다과회</Title>
      <Card>
        <form action="api/testlogin" method="post">
          <Field
            name="username"
            placeholder="아이디"
            type="text"
            value={userid}
            onChange={handleId}
            required
          />
          <Field
            name="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={handlePassword}
            required
          />
          
          <LoginButtonWrap>
            <LoginButton type="submit">로그인</LoginButton>
            {/* 나중에 경로 채우기 */}
            <Link href='/user/v1/findingid' passHref legacyBehavior><PageLinkText>아이디 찾기</PageLinkText></Link>
            <Link href='/user/v1/findingpw' passHref legacyBehavior><PageLinkText>비밀번호 찾기</PageLinkText></Link>
            <Link href='/user/signup' passHref legacyBehavior><PageLinkText>회원가입</PageLinkText></Link>
          </LoginButtonWrap>
        </form>
      </Card>
    </Container>
  );
}

export default Login;