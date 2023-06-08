import React from "react";
import styles from "../styles/App.module.css";

import ErrorBoundary from "../ErrorBoundary";
import classNames from "classnames";

import SearchBar from "../components/SearchBar";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import styled from "styled-components";
import {BlogProvider, useBlogState} from "../context/BlogContext";

const BlogTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

const Blog = () => {

  // css 클래스명 객체를 호출 시 문자열 바인딩이 가능하도록 함
  const cx = classNames.bind(styles);

  // styleName 이라는 클래스 명의 객체를 바인딩
  // cx('styleName')

  return (
    <BlogProvider>
      <BlogTemplateBlock>
        {/*useReducer의 dispatch를 deep component까지 전달할 수 있도록 호환하는 태그*/}

        {/* styles : css 클래스 명 고유화를 위한 객체화 */}
        {/* classNames : 복수 클래스 명을 동적으로 적용 시 배열과 같은 형태로 선언 가능 */}

          <SearchBar />
          {/*<button onClick={ changeOrder } >sort</button>*/}
          {/*<hr/>*/}

          <ErrorBoundary>
            {/*하위 component 내에서 오류 발생(props 누락 등) 시 이를 감지하고 예외 처리를 수행하는 태그*/}

            <PostList />
          </ErrorBoundary>

          <h2>글쓰기</h2>
          <hr/>
          <CreatePost />
      </BlogTemplateBlock>
    </BlogProvider>
  );
};

export default Blog;