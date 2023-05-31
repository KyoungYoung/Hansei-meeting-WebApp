import Link from 'next/link';
import {useCallback, useState} from "react";
import styled from "styled-components";
import { useForm, SubmitHandler  } from "react-hook-form";
import { useRouter } from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F6FEFF;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  margin-bottom: 32px;
  font-size: 4rem;
`;

const FieldWapper=styled.div`
  width:530px;
`;

const Field = styled.input`
  width: 100%;
  padding: 12px;
  margin-top:8px;
  margin-bottom: 8px;
  border: 1px solid #bec3c7;
  border-radius: 4px;
  box-sizing:border-box;
`;

const StyledLabel=styled.label`
  font-weight:600;
  font-size:16;
`;

const LoginButton = styled.button`
  background-color: #000000;
  color: #fff;
  padding: 12px;
  border: none;
  width:100%;
  justify-self:center;
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



const BottomLinkWrapper=styled.div`
  display:flex;
  justify-content:space-around;
  border:1px;
`;

const ErrorText= styled.span`
  display:inline-block;
  color:chocolate;
  font-size:14px;
  text-decoration:none;
  height:8px;
  width:100%;
`;
interface LoginProps {
  userId:string;
  password:string;
}

function Login() {
    const router= useRouter()
    const [errorText, setErrorText]=useState('');
    const { register, formState:{errors,isSubmitting}, handleSubmit } = useForm<LoginProps>({mode:'onChange'});
    const onSubmit: SubmitHandler<LoginProps> =useCallback(async (e)=>{
      const data={
        username:e.userId,
        password:e.password,
      }
      const JSONdata = JSON.stringify(data);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      };
      const apiURL=`/api/${process.env.NEXT_PUBLIC_VAPI}/login`
   
      const response = await fetch(apiURL, options);
      if(response.ok){
        switch(response.status){
          case 201:
            router.push(await response.text() )
            break;
          case 200:
            const result = await response.json();
          }
        }else{
          setErrorText("이메일 또는 비밀번호를 확인하세요");
        }
    },[]) 
  return (
    <Container>
        <Title>다과회</Title>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldWapper>
            <StyledLabel htmlFor='userId'>아이디</StyledLabel>
            <Field
              placeholder="아이디 및 이메일"
              type="text"
               {...register("userId",{ required: "아이디 및 이메일을 입력해주세요" })}
            />
            <StyledLabel htmlFor='password'>비밀번호</StyledLabel>
            <Field
            {... register("password",{ required: "비밀번호를 입력해주세요" })}
              placeholder="비밀번호"
              type="password"
            />
            <ErrorText>{errorText||errors.userId&&errors?.userId.message||errors.password&&errors?.password.message}</ErrorText>

          </FieldWapper>  
          <LoginButton type="submit">로그인</LoginButton>
          <BottomLinkWrapper>
            {/* 나중에 경로 채우기 */}
            <Link href='/user/findingid' passHref legacyBehavior><PageLinkText>아이디 찾기</PageLinkText></Link>
            <Link href='/user/findingpw' passHref legacyBehavior><PageLinkText>비밀번호 찾기</PageLinkText></Link>
            <Link href='/auth/signup' passHref legacyBehavior><PageLinkText>회원가입</PageLinkText></Link>
          </BottomLinkWrapper>
        </form>
      </Card>
    </Container>
  );
}


export default Login;