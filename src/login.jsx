import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f5;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  width: 260px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #ff4757;
  }
`;

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("https://auth.petg.store/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("로그인 실패: " + (error.detail || "알 수 없는 오류"));
        return;
      }

      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);
      navigate("/main"); // 로그인 성공 후 /main으로 이동
    } catch (err) {
      alert("서버 오류: " + err);
    }
  };

  return (
    <LoginContainer>
      <Title>🐾 PetG 로그인</Title>
      <Input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>로그인</Button>
    </LoginContainer>
  );
}

export default App;
