import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {signUp}  from '../../firebase';



interface FormValue {
  nickname: string;
  email: string;
  password: string;
}


function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  // 회원 가입 버튼 클릭시 실행될 함수
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const {email, password, nickname} = data
    signUp(email, password, nickname)
      .then(user => {
        if (user) {
          alert(`${nickname}님 환영합니다! 확인 버튼을 누르면 로그인 창으로 이동합니다!`)
          navigate("/login")
        }
      })
  };

  return (
    <>
    <SingupContainer>
      <Logo>
        {" "}
        <Link to='/'>나만의 작은 음악 다이어리</Link>
      </Logo>

      <FormContainer>
        <NicknameInput type='text' placeholder='닉네임' {...register("nickname", {
          required: "닉네임을 입력해 주세요.",
          maxLength: { 
            value: 10, 
            message: "10자리 이하로 입력해 주세요." 
          },
        })} />
        {errors.nickname && <EmailErrormsg>{errors.nickname.message}</EmailErrormsg>}
        
        <EmailInput type='email' placeholder='이메일' {...register("email", {
          required: "이메일을 입력해 주세요",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "이메일 형식에 맞지 않습니다.",
          },
        })} />
        {errors.email && <EmailErrormsg>{errors.email.message}</EmailErrormsg>}
        
        <PasswordInput type='password' placeholder='비밀번호' {...register("password",{
          required: "비밀번호를 입력해 주세요.",
          minLength: {
            value: 4,
            message: "4자리 이상 입력해 주세요.",
          },
          maxLength: {
            value: 10,
            message: "10자리 이하로 입력해 주세요.",
          },
        })} />
        {errors.password && <PasswordErrormsg>{errors.password.message}</PasswordErrormsg>}
        
        <SignupButton type='button' onClick={handleSubmit(onSubmit)}>
          가입
        </SignupButton>
      </FormContainer>
      <Link to='/login'>
        <MoveLogin>
          계정이 있으신가요? <span className='bold'>로그인</span>
        </MoveLogin>
      </Link>
    </SingupContainer>
    </>

  );
}

export default Signup;

const SingupContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 27px;
  margin-bottom: 30px;

  a {
    color: ${(props) => props.theme.logo};
    text-decoration: none;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 400px;
  border-radius: 4px;
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.disabledTagBackground};
`;

const NicknameInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.background};

  &:focus {
    outline: none;
  }
`;

const EmailInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-bottom: 10px;
  margin-top:10px;
  color: ${(props) => props.theme.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.background};

  &:focus {
    outline: none;
  }
`;

const PasswordInput = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-bottom: 10px;
  margin-top:10px;
  color: ${(props) => props.theme.mainText};
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.background};

  &:focus {
    outline: none;
  }
`;

const SignupButton = styled.button`
  width: 80vw;
  max-width: 350px;
  height: 45px;
  border: none;
  border-radius: 4px;
  color: #1c1a16;
  font-size: 15px;
  font-weight: 700;
  margin-top:30px;
  background-color: ${(props) => props.theme.mainColor};
  cursor: pointer;

  &:hover {
    background-color: #ffdeb7;
  }
`;

const MoveLogin = styled.button`
  font-size: 14px;
  margin-top: 20px;
  width: 410px;
  height: 60px;
  border-radius: 4px;
  border: none;
  color: ${(props) => props.theme.mainText};
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.disabledTagBackground};
  cursor: pointer;

  > .bold {
    font-weight: 500;
  }
`;

export const EmailErrormsg = styled.div`
  margin-top: 6px;
  color: #d0393e;
  font-size: 12px;
`;

export const PasswordErrormsg = styled.div`
  margin-top: 6px;
  margin-bottom: -17px;
  color: #d0393e;
  font-size: 12px;
`;