import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff5f7, #ffffff);
  font-family: 'Pretendard', sans-serif;
`;

const Header = styled.div`
  background: #ffb3c6;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const VideoSection = styled.div`
  background: black;
  width: 100%;
  height: 500px;
  border-bottom: 1px solid #ddd;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  flex-wrap: wrap;
  background: white;
  border-bottom: 1px solid #ddd;
`;

const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  margin: 0.5rem;
  background: #fff0f3;
  border: none;
  border-radius: 1rem;
  padding: 0.8rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background: #ffe3e9;
  }
`;

const Icon = styled.span`
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
`;

const ModeSelect = styled.div`
  display: flex;
  justify-content: center;
  background: white;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;

const ModeButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 1rem;
  background: ${(props) => (props.active ? '#ff6b81' : '#ffb3c6')};
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const ContentArea = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #ddd;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: #ff6b81;
`;

const VideoList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const VideoItem = styled.li`
  margin-bottom: 0.5rem;
`;

const ClearBadge = styled.span`
  background: #4ade80;
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 350px;
`;

const ModalContent = styled.div`
  background: #fdf7dd;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  background: #ff6b81;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 100px;
`;

export default function PetCamUI() {
  const [mode, setMode] = useState("home");
  const [training, setTraining] = useState("앉아");
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);

  const trainingInstructions = {
    "앉아": [
      "간식을 강아지 코앞에 갖다 대고 냄새를 맡게 해 주세요.",
      "손에 간식을 들고 강아지와 마주 앉으세요.",
      "간식을 강아지 머리 위로 들어 올리세요. 강아지는 간식을 올려다보며 자연스럽게 앉을 것입니다.",
      "강아지가 앉으면 칭찬과 보상을 해주세요.",
      "하루에 여러 번 반복하세요.",
      "강아지가 계속해서 잘 앉는다면 간식 없이도 앉을 수 있도록 점차적으로 간식을 줄입니다."
    ],
    "엎드려": [
      "강아지를 앉힌 후 손바닥을 펴서 '엎드려'라고 말합니다.",
      "강아지가 자세를 낮추고 엎드리면 간식을 줍니다.",
      "엎드리는 자세가 익숙해지도록 반복합니다.",
      "지속적으로 칭찬하며 습관화 시켜 주세요."
    ],
    "손!": [
      "간식을 손에 쥐고 강아지에게 '손!' 이라고 말합니다.",
      "강아지가 앞발을 들면 손바닥을 내밀어 올리게 유도합니다.",
      "발을 올리면 간식과 칭찬을 함께 주세요.",
      "이 동작을 반복하여 익숙해지게 하세요."
    ]
  };

  const handleTrainingClick = (type) => {
    setTraining(type);
    setShowTrainingModal(true);
  };

  const confirmTraining = () => {
    setShowTrainingModal(false);
    setShowRecordModal(true);
  };

  const startRecording = () => {
    setShowRecordModal(false);
    // 실제 녹화 로직 실행 예정
  };

  return (
    <Container>
      <Header>PetG 홈캠</Header>
      <VideoSection />

      <ModeSelect>
        <ModeButton active={mode === "home"} onClick={() => setMode("home")}>일반 모드</ModeButton>
        <ModeButton active={mode === "train"} onClick={() => setMode("train")}>훈련 모드</ModeButton>
      </ModeSelect>

      {mode === "home" && (
        <>
          <ButtonGroup>
            <IconButton><Icon>📸</Icon>스크린샷</IconButton>
            <IconButton><Icon>🎤</Icon>말하기</IconButton>
            <IconButton><Icon>🎥</Icon>녹화</IconButton>
            <IconButton><Icon>▶️</Icon>재생</IconButton>
            <IconButton><Icon>🔁</Icon>방향</IconButton>
            <IconButton><Icon>🚨</Icon>경보</IconButton>
          </ButtonGroup>

          <ContentArea>
            <SectionTitle>📂 저장된 영상</SectionTitle>
            <VideoList>
              <VideoItem>2025-07-11_훈련_앉아.mp4</VideoItem>
              <VideoItem>2025-07-10_일반_캡처.mp4</VideoItem>
            </VideoList>
          </ContentArea>
        </>
      )}

      {mode === "train" && (
        <ContentArea>
          <SectionTitle>🏅 훈련 모드: {training}</SectionTitle>
          <div style={{ marginBottom: '1rem' }}>
            훈련 중입니다. 훈련 완료 시 아래 아이콘에 CLEAR가 표시됩니다.
          </div>
          <ButtonGroup>
            <IconButton onClick={() => handleTrainingClick("앉아")}> <Icon>🪑</Icon>앉아 {training === "앉아" && <ClearBadge>CLEAR</ClearBadge>}</IconButton>
            <IconButton onClick={() => handleTrainingClick("엎드려")}> <Icon>🛏️</Icon>엎드려 {training === "엎드려" && <ClearBadge>CLEAR</ClearBadge>}</IconButton>
            <IconButton onClick={() => handleTrainingClick("손!")}> <Icon>🐾</Icon>손! {training === "손!" && <ClearBadge>CLEAR</ClearBadge>}</IconButton>
          </ButtonGroup>

          <SectionTitle>📂 저장된 훈련 영상</SectionTitle>
          <VideoList>
            <VideoItem>2025-07-11_훈련_앉아.mp4</VideoItem>
          </VideoList>
        </ContentArea>
      )}

      {showTrainingModal && (
        <ModalOverlay>
          <ModalBox>
            <h3 style={{ color: '#ff6b81', marginBottom: '1rem' }}>
              "{training}" 훈련 설명
            </h3>
            <ModalContent>
              {trainingInstructions[training]?.map((step, index) => (
                <p key={index} style={{ marginBottom: '0.5rem' }}>{index + 1}. {step}</p>
              ))}
            </ModalContent>
            <ModalButtonContainer>
              <ModalButton onClick={confirmTraining}>훈련 시작!</ModalButton>
              <ModalButton onClick={() => setShowTrainingModal(false)}>취소</ModalButton>
            </ModalButtonContainer>
          </ModalBox>
        </ModalOverlay>
      )}

      {showRecordModal && (
        <ModalOverlay>
          <ModalBox style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#ff6b81' }}>녹화를 시작할까요?</h3>
            <ModalButtonContainer>
              <ModalButton onClick={startRecording}>시작</ModalButton>
              <ModalButton onClick={() => setShowRecordModal(false)}>취소</ModalButton>
            </ModalButtonContainer>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
}
