import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { getUserData, userLogin } from '../../firebase';
import { useAppDispatch } from '../../redux/store/hooks';
import { logined } from '../../redux/slice/LoginSlice';



interface FormValue {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    userLogin(data.email, data.password)
      .then(user => {
        console.log('로그인한',user)
        if(user === 'auth/invalid-email') { 
          return alert('이메일과 비밀번호를 다시 확인해 주세요')
        }else if (user === 'auth/wrong-password'){
          return alert('이메일과 비밀번호를 다시 확인해 주세요')
        } else {
          getUserData(user.uid)
            .then((res:any) => dispatch(logined(res && res[1])))
            // .then((res:any) => console.log('로그인res',res))
            .then(()=>  navigate('/'))
        }
      })
    };

  return (
    <LoginContainer>
      <Logo>
        <Link to='/'>나만의 작은 음악 다이어리</Link>
      </Logo>
      <FormContainer>
        {/* {loginError ? <Errormsg>The email or password is incorrect.</Errormsg> : null} */}
        <EmailInput
          type='email'
          placeholder='이메일'
          {...register("email", {
            required: '이메일을 입력해 주세요',
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <Errormsg>이메일을 입력해 주세요</Errormsg>
        )}
        <PasswordInput
          type='password'
          placeholder='비밀번호'
          {...register("password", {
            required: '비밀번호를 입력해 주세요',
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <Errormsg>비밀번호를 입력해 주세요</Errormsg>
        )}
        <LoginButton type='button' onClick={handleSubmit(onSubmit)}>
          로그인
        </LoginButton>
      </FormContainer>
      <Link to='/Signup'>
        <MoveSignup>
          <span className='bold'>회원 가입</span>
        </MoveSignup>
      </Link>
    </LoginContainer>
  );
}



export default Login;

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 600px) {

      }
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
  width: 410px;
  height: 250px;
  border-radius: 4px;
  border: none;
  border: 1px solid ${(props) => props.theme.disabledTagBorder};
  background-color: ${(props) => props.theme.disabledTagBackground};
  @media screen and (max-width: 600px) {
  width: 370px;
}
`;

const EmailInput = styled.input`
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

const LoginButton = styled.button`
  width: 350px;
  height: 45px;
  border: none;
  border-radius: 4px;
  color: #1c1a16;
  font-size: 15px;
  font-weight: 700;
  background-color: ${(props) => props.theme.mainColor};
  cursor: pointer;

  &:hover {
    background-color: #ffdeb7;
  }
`;


const MoveSignup = styled.button`
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
  @media screen and (max-width: 600px) {
  width: 370px;
}
`;

const Errormsg = styled.p`
  color: #d0393e;
  margin: 2px 0px;
  padding: 2px;
  font-size: 12px;
`;