import styled from 'styled-components';
import Link from 'next/link';

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

type Post = { // 게시글의 타입
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  timestamp: number;
};

const posts: Post[] = [
  {
    id: 1,
    title: '오늘 진짜 귀여운 고양이 봤어!!',
    author: '박동주',
    date: '2023-04-10',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 2,
    title: '오늘 ',
    author: '박동주',
    date: '2023-04-11',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 3,
    title: '오늘 ',
    author: '박동주',
    date: '2023-04-12',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 4,
    title: '오늘 ',
    author: '박동주',
    date: '2023-04-13',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 5,
    title: '오늘 ',
    author: '박동주',
    date: '2023-04-14',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 6,
    title: '오늘 ',
    author: '박동주',
    date: '2023-04-15',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 7,
    title: '오늘 ',
    author: '박동주',
    date: '2023-04-16',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 8,
    title: '오늘 ',
    author: '박동주',
    date: '2023-04-17',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 9,
    title: '오늘 ',
    author: '박동주',
    date: '2023-04-18',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 10,
    title: '오늘 ',
    author: '박동주',
    date: '2023-04-19',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
];

const sortedPosts = [...posts].sort((a, b) => b.id - a.id);


const StyledLink = styled.a`
  cursor: pointer;
  color: black;
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

  a {
  text-decoration: none;
  color: inherit;
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
          {sortedPosts.map((post) => (
          <tr key={post.id}>
            <Td>{post.id}</Td>
            <Td>
              <Link href={'/a'}>
                {/* <StyledLink>{post.title}</StyledLink> */}
                {post.title}
              </Link>
            </Td>
            <Td>{post.author}</Td>
            <Td>{post.views}</Td>
            <Td>{post.date}</Td>
            <Td>{post.likes}</Td>
          </tr>
        ))}
          
        </Tbody>
        </Table>
      </Board>
      </InnerBox>
     
     );
  }
  
  export default Test ;