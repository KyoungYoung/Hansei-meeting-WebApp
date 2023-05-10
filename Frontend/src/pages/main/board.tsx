import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid #ccc;
  padding-bottom: 1rem;
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
`;

const PostDate = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: #666;
`;

const PostContent = styled.p`
  margin-top: 2rem;
  font-size: 1.6rem;
  line-height: 2.6rem;
  white-space: pre-line;
`;

interface PostProps {
  title: string;
  date: string;
  content: string;
}

function Post({ title, date, content }: PostProps) {
  return (
    <PostWrapper>
      <PostHeader>
        <PostTitle>{title}</PostTitle>
        <PostDate>{date}</PostDate>
      </PostHeader>
      <PostContent>{content}</PostContent>
    </PostWrapper>
  );
}

const postList = [
  {
    id: 1,
    title: '첫 번째 글입니다.',
    date: '2022-01-01',
    content: '첫 번째 글입니다. 안녕하세요!',
  },
  {
    id: 2,
    title: '두 번째 글입니다.',
    date: '2022-01-02',
    content: '두 번째 글입니다. 반갑습니다!',
  },
  {
    id: 3,
    title: '세 번째 글입니다.',
    date: '2022-01-03',
    content: '세 번째 글입니다. 잘 부탁드립니다!',
  },
];

const PostListWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

function PostList() {
  return (
    <PostListWrapper>
      {postList.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          date={post.date}
          content={post.content}
        />
      ))}
    </PostListWrapper>
  );
}
export default Post;