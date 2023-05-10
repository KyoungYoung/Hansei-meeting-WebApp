import styled from 'styled-components';

const InnerBox = styled.div`
  display: flex;

`;

const Board = styled.div`
  margin: 0 auto;
`;

const Title = styled.h1` 
margin: 5px 0;
  font-size:2.5rem;
  display:flex;
`;

const Explain = styled.p`
  margin: 5px 0;
  font-size:0.8rem;
`;

const Table = styled.table`
 width: 1300px;
 margin: 0 auto;
 margin-top: 20px;
border-collapse: collapse;
border: none;
text-align: center;

`;

const Tbody = styled.tbody`
 border: none;
`;

const Td = styled.td` // 게시글의 내용 부분
  height: 48px;
  padding: 16px 0 14px;
  border: 2px solid #9C9C9C;
  border-left: none;
  border-right: none;

  &:first-child {
    border-left: 2px solid #9C9C9C;
  }
  &:last-child {
    border-right: 2px solid #9C9C9C;
  }
`;

const Th = styled.th` // 게시글의 윗 머리 부분
 
  height: 48px;
  padding: 16px 0 14px;
  border: 2px solid #9C9C9C;
  border-top: 2px solid #9C9C9C;
  border-left: none;
  border-right: none; 
  background-color: #E5F7FF; 
  border-bottom: 2px solid #9C9C9C;
  &:first-child {
    border-left: 2px solid #9C9C9C;
    
  }
  &:last-child {
    border-right: 2px solid #9C9C9C;
  }
`;
function Test () {
    return (  
      <InnerBox>                 
      <Board>
        <Title>자유게시판</Title>
        <Explain>다과회의 자유게시판입니다.</Explain>
        <Table>
        <Tbody>
          <tr>
            <Th>번호</Th>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>날짜</Th>
            <Th>조회수</Th>
            <Th>좋아요</Th>
          </tr>
          <tr>
            <Td>11</Td>
            <Td>오늘 진짜 귀여운 고양이 봤어!!</Td>
            <Td>박동주</Td>
            <Td>199</Td>
            <Td>2023-04-10</Td>
            <Td>6</Td>
          </tr>
          <tr>
            <Td>10</Td>
            <Td>이번주 학식 완젼 최고야</Td>
            <Td>변혜림</Td>
            <Td>254</Td>
            <Td>2023-04-10</Td>
            <Td>6</Td>
          </tr>
          <tr>
            <Td>9</Td>
            <Td>같이 자격증 공부할 사람~</Td>
            <Td>홍길동</Td>
            <Td>23</Td>
            <Td>2023-04-10</Td>
            <Td>6</Td>
          </tr>
          <tr>
            <Td>8</Td>
            <Td>1호선 연착 무슨 일이야</Td>
            <Td>임꺽정</Td>
            <Td>8</Td>
            <Td>2023-04-10</Td>
            <Td>26</Td>
          </tr>
          <tr>
            <Td>7</Td>
            <Td>1호선 연착 무슨 일이야</Td>
            <Td>임꺽정</Td>
            <Td>8</Td>
            <Td>2023-04-10</Td>
            <Td>26</Td>
          </tr>
          <tr>
            <Td>6</Td>
            <Td>1호선 연착 무슨 일이야</Td>
            <Td>임꺽정</Td>
            <Td>8</Td>
            <Td>2023-04-10</Td>
            <Td>26</Td>
          </tr>
          <tr>
            <Td>5</Td>
            <Td>1호선 연착 무슨 일이야</Td>
            <Td>임꺽정</Td>
            <Td>8</Td>
            <Td>2023-04-10</Td>
            <Td>26</Td>
          </tr>
          <tr>
            <Td>4</Td>
            <Td>1호선 연착 무슨 일이야</Td>
            <Td>임꺽정</Td>
            <Td>8</Td>
            <Td>2023-04-10</Td>
            <Td>26</Td>
          </tr>
          <tr>
            <Td>3</Td>
            <Td>1호선 연착 무슨 일이야</Td>
            <Td>임꺽정</Td>
            <Td>8</Td>
            <Td>2023-04-10</Td>
            <Td>26</Td>
          </tr>
          <tr>
            <Td>2</Td>
            <Td>1호선 연착 무슨 일이야</Td>
            <Td>임꺽정</Td>
            <Td>8</Td>
            <Td>2023-04-10</Td>
            <Td>26</Td>
          </tr>
          <tr>
            <Td>1</Td>
            <Td>1호선 연착 무슨 일이야</Td>
            <Td>임꺽정</Td>
            <Td>8</Td>
            <Td>2023-04-11</Td>
            <Td>26</Td>
          </tr>
        </Tbody>
        </Table>
      </Board>
      </InnerBox>
     
     );
  }
  
  export default Test ;