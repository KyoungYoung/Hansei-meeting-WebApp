import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f3f4;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  margin-bottom: 32px;
  font-size: 24px;
`;

const Field = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #bec3c7;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #4285f4;
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

interface LoginProps {
  onSubmit: (username: string, password: string) => void;
}

function Login({ onSubmit }: LoginProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    onSubmit(username, password);
  };

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <Field
            name="username"
            placeholder="Username"
            type="text"
            required
          />
          <Field
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </form>
      </Card>
    </Container>
  );
}

export default Login;