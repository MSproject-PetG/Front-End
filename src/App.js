import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const CAMERA_API = "https://relay.petg.store"; // 카메라 서버 주소
const AI_API = "https://petg.store"

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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoStream = styled.img`
  width: 100%;
  max-width: 800px;
  height: 100%;
  object-fit: contain;
`;

const ResultBox = styled.div`
  margin-top: 10px;
  color: white;
  font-size: 1.2rem;
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
  const [streaming, setStreaming] = useState(false);
  const [poseResult, setPoseResult] = useState("");

  const trainingInstructions = {
  "앉아": [
    "간식을 강아지 코앞에 갖다 대고 냄새를 맡게 해 주세요.",
    "손에 간식을 들고 강아지와 마주 앉으세요.",
    "간식을 강아지 머리 위로 들어 올리세요.",
    "강아지가 앉으면 칭찬과 보상을 해주세요."
  ],
  "엎드려": [
    "강아지를 앉힌 후 손바닥을 펴서 '엎드려'라고 말합니다.",
    "강아지가 자세를 낮추고 엎드리면 간식을 줍니다."
  ],
  "손!": [
    "간식을 손에 쥐고 강아지에게 '손!' 이라고 말합니다.",
    "앞발을 들면 손바닥을 내밀어 올리게 유도합니다."
  ]
};


  useEffect(() => {
    let interval;
    if (mode === "train") {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(`${AI_API}/pose-result`);
          if (res.data?.result) setPoseResult(res.data.result);
        } catch (e) {
          console.error("자세 결과 수신 오류:", e);
        }
      }, 2000);
    } else {
      setPoseResult("");
    }
    return () => clearInterval(interval);
  }, [mode]);

  const toggleStream = async () => {
    try {
      const command = streaming ? "stop_stream" : "start_stream";
      await axios.post(`${CAMERA_API}/control`, {
        command: command,
      });
      setStreaming(!streaming);
    } catch (err) {
      alert("카메라 연결 오류: " + err);
    }
  };


  const startTraining = async () => {
    try {
      await axios.post(`${CAMERA_API}/control`, {
        command: "start_training",
      });
    } catch (err) {
      console.error("훈련 모드 시작 실패:", err);
    }
  };

  const stopTraining = async () => {
    try {
      await axios.post(`${CAMERA_API}/control`, {
        command: "stop_training",
      });
    } catch (err) {
      console.error("훈련 모드 종료 실패:", err);
    }
  };


  const handleTrainingClick = (type) => {
    setTraining(type);
    setShowTrainingModal(true);
  };

  const confirmTraining = () => {
    setShowTrainingModal(false);
    setShowRecordModal(true);
    startTraining();
  };

  const startRecording = () => {
    setShowRecordModal(false);
    // 실제 녹화 로직 실행 예정
  };

  useEffect(() => {
    if (mode === "train") startTraining();
    else stopTraining();
  }, [mode]);

  return (
    <Container>
      <Header>PetG 홈캠</Header>

      {/* ✅ 실시간 영상 스트리밍 + 자세 분석 결과 */}
      <VideoSection>
        {streaming ? (
          <>
            <VideoStream src="https://relay.petg.store/video" alt="Live" />
            {mode === "train" && (
              <ResultBox>자세 결과: {poseResult || "분석 중..."}</ResultBox>
            )}
          </>
        ) : (
          <div style={{ color: "white", fontSize: "1.2rem" }}>
            🔌 영상이 꺼져 있습니다. 아래 ▶️ 아이콘을 눌러 켜주세요.
          </div>
        )}
      </VideoSection>

      {/* ✅ 모드 선택 버튼 */}
      <ModeSelect>
        <ModeButton active={mode === "home"} onClick={() => setMode("home")}>일반 모드</ModeButton>
        <ModeButton active={mode === "train"} onClick={() => setMode("train")}>훈련 모드</ModeButton>
      </ModeSelect>

      {/* ✅ 일반 모드 UI */}
      {mode === "home" && (
        <>
          <ButtonGroup>
            <IconButton><Icon>📸</Icon>스크린샷</IconButton>
            <IconButton><Icon>🎤</Icon>말하기</IconButton>
            <IconButton><Icon>🎥</Icon>녹화</IconButton>
            <IconButton onClick={toggleStream}><Icon>▶️</Icon>{streaming ? "중지" : "재생"}</IconButton>
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

      {/* ✅ 훈련 모드 UI */}
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

      {/* ✅ 훈련 설명 모달 */}
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

      {/* ✅ 녹화 확인 모달 */}
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
