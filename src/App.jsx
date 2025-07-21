import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";  // 로그인 페이지
import Main from "./Main";    // 원래 App.jsx에서 보여주던 메인 콘텐츠

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;
