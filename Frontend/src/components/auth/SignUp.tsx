import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';


const domainList = ['hansei.ac.kr', 'gmail.com'];
const SignupFormWrap=styled.div`
    display:flex;
    justify-content:column;
    background-color:white;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #ffffff;
  padding: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 1px solid #bec3c7;
  border-radius: 4px;
  box-sizing: border-box;
`;

const EmailField =styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
`
const StyledLabel=styled.label`
  font-weight:600;
  font-size:16px;
  white-space:nowrap;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F6FEFF;
`;

const ErrorText= styled.span<{fontSize?:number}>`
  display:inline-block;
  color:chocolate;
  font-size:${(props)=>(props.fontSize||14)+'px'};
  text-decoration:none;
  height:8px;
  width:100%;
`;
const FieldWapper=styled.div`
    max-width:800px;
    min-width:200px;
`;

const SignUpButton = styled.button`
  background-color: #000000;
  color: #fff;
  padding: 12px;
  border: none;
  width:150px;
  border-radius:4px;
  align-self:end;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #1a73e8;
  }
`;
const PageLinkText = styled.span`
  color: #808080;
  font-size:0.8rem;
  padding:8px;
  text-decoration:none;
  align-self:flex-start;
`;
const Title = styled.h1`
  margin-bottom: 32px;
  font-size: 4rem;
`;

interface SignupData {
    email:string;
    emailDomain:string;
    password:string;
    passwordConfirm:string;
    studentNumber:string;
    userMajor:string;
    option?:{
        gender:string;
        loginType:string;
    }
    privacyCheck:boolean;
  }
  
function SignUp() {
    const router= useRouter()
    const [domainOptions,setDomainOptions]=useState(domainList);
    const { register, formState:{errors,isSubmitting},getValues, handleSubmit,setValue, setError,clearErrors,watch } = useForm<SignupData>({mode:'onBlur',criteriaMode:'firstError'});
    const onSubmit: SubmitHandler<SignupData> =useCallback(async (e)=>{
    const data={
        email:e.email,
        password:e.password,
        studentNumber:e.studentNumber,
        userMajor:e.userMajor
    }
    const JSONdata = JSON.stringify(data);
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSONdata,
    };
    const apiURL=`/api/${process.env.NEXT_PUBLIC_VAPI}/signup`
    
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
        }
    },[])

    const handlePasswordBlur = () => {
        const password = getValues("password")
        const passwordConfirm = getValues("passwordConfirm");
        if(password !== passwordConfirm){
            setError('passwordConfirm',{
                type:'passwordNotMatch',
                message:"비밀번호가 일치하지 않습니다."
            })
        }
            
      };
    return(
        <Container>
            <Title>다과회 회원가입</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormContainer>
                    <FieldWapper>
                        <EmailField>
                        <StyledLabel>이메일</StyledLabel>
                        <Field type="email" {...register("email", { required: "이메일은 필수입니다." })} onFocus={()=>clearErrors("email")}/>
                        @
                        {watch('emailDomain') === '직접입력' && (
                            <Field
                            type="text"
                            placeholder="도메인을 직접 입력해주세요"
                            onBlur={(e)=>{
                                    setDomainOptions([e.target.value,...domainOptions]);
                                    setValue('emailDomain',e.target.value);
                            }}
                            />)}
                        <Select {...register('emailDomain',{required:true})} >
                        {domainOptions.map((domain) => (
                            <option key={domain} value={domain}>
                                {domain}
                            </option>
                        ))}
                        <option key={"직접입력"} value={"직접입력"}>
                            {"직접입력"}
                        </option>
                        </Select>
                        </EmailField>
                        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                        <StyledLabel>비밀번호</StyledLabel>
                        <Field type="password" {...register("password", { 
                            required: "비밀번호는 필수입니다.",
                            pattern: {
                                value:/^(?=.*\d)(?=.*[a-zA-Z])[!@#$%^&*_a-zA-Z0-9]$/, 
                                message:"영문자, 숫자, 특수문자(!@#$%^&*_)만 입력가능합니다"
                                },
                            min:{value:8,message:"8~32자리의 비밀번호를 입력해주세요"},
                            max:{value:32,message:"8~32자리의 비밀번호를 입력해주세요"}
                            })} 
                            onFocus={()=>clearErrors("password")}
                            />
                        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                        <StyledLabel>비밀번호 재확인</StyledLabel>
                        <Field
                        type="password"
                        {...register("passwordConfirm", { required: "입력한 비밀번호를 확인해주세요" })}
                        onBlur={handlePasswordBlur}
                        />
                        <ErrorText>{errors.passwordConfirm&&errors.passwordConfirm.message}</ErrorText>
                        <StyledLabel>학번</StyledLabel>
                        <Field
                        type="text"
                        {...register("studentNumber", { required:"학번은 필수입니다" })}
                        onFocus={()=>clearErrors("studentNumber")}
                        />
                        {errors.studentNumber && <ErrorText>{errors.studentNumber.message}</ErrorText>}
                        <StyledLabel>학과</StyledLabel>
                        <Field type="text" {...register("userMajor", { required: "학과는 필수입니다" })}onFocus={()=>clearErrors("userMajor")}/>
                        {errors.userMajor && <ErrorText>{errors.userMajor.message}</ErrorText>}
                    </FieldWapper>
                        
                            <PageLinkText>
                                개인정보처리방침을 확인하였고 동의합니다
                                <input type='checkbox'
                                {...register('privacyCheck', { required:"서비스 제공을 위해 동의해주세요"})}
                                />
                            </PageLinkText>
                            <ErrorText fontSize={12}>{errors.privacyCheck&&errors.privacyCheck.message}</ErrorText>
                    <SignUpButton type="submit">가입하기</SignUpButton>
                </FormContainer>
            </form>
    </Container>
        
    )
};
      
export default SignUp;