import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60rem;
  height: 20rem;
`;

const Box = styled.div`
  width: 18.75rem;
  height: 18.75rem;
  background-color: #F6FFF1;
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: center;
  justify-content: center;
  border: solid gray;
`;

const InnerBox = styled.div`
font-size: smaller;
  width: 15.5rem;
  height: 2rem;
  background-color: #fff;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem; /* 각 InnerBox의 아래쪽 간격을 0.5rem으로 설정 */
`;

const InnerBox2 = styled.div`
font-size: smaller;
  width: 15.5rem;
  height: 2rem;
  background-color: #fff;
  margin-top: 1rem;
  margin-bottom: 0.5rem; 
`;

const InnerBox3 = styled.div`
font-size: smaller;
  width: 15.5rem;
  height: 2rem;
  background-color: #fff;
  margin-top: 1rem;
  margin-bottom: 0.5rem; 
`;

function App() {
  return (
    <Container>
      <Box>
        <InnerBox>내일 저녁에 농구하실 분</InnerBox>
        <InnerBox>집으로 순간이동 하고 싶다</InnerBox>
        <InnerBox>투자론 과제 어떻게 하는지 아는 사람ㅠ</InnerBox>
        <InnerBox>오늘 저메추 해쥬라</InnerBox>
        <InnerBox>종강하고 싶은 사람 좋아요 박고 가</InnerBox>
        <InnerBox>다들 mbti 머야?</InnerBox>
        <InnerBox>낼 과팅하는데 옷 어캐 입어야 할깡</InnerBox>
        <InnerBox>과팅 해본 사람 후기 좀~.~</InnerBox>
      </Box>
      <Box>
        <InnerBox2>✔투자론 6주차 과제 제출</InnerBox2>
        <InnerBox2>✔지도교수님 상담</InnerBox2>
        <InnerBox2>✔비교과프로그램 수강</InnerBox2>
      </Box>
      <Box>
      <InnerBox3>⭐경영학과</InnerBox3>
      <InnerBox3>⭐ict융합학과</InnerBox3>
      <InnerBox3>⭐컴퓨터공학과</InnerBox3>
      </Box>
    </Container>
  );
}

export default App;
