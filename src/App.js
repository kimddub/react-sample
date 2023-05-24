/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React, {useCallback, useReducer, useRef} from 'react';
import PostList from "./PostList";
import CreatePost from "./CreatePost";

const initialState = {
  inputs: {
    title: '',
    content: ''
  },
  postList: [
    { id: 1, title: '판교 맛집 추천', content: '판교 맛집 추천 포스팅입니다.', hit: 10, isEditable: false, isSelected: false }
    , { id: 2, title: '판교 술집 추천', content: '판교 술집 추천 포스팅입니다.', hit: 5, isEditable: true, isSelected: false }
    , { id: 3, title: '판교 야경 추천', content: '판교 야경 추천 포스팅입니다.', hit: 0, isEditable: false, isSelected: false }
  ]
};

function reducer(state, action) {
  switch(action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_POST':
      return {
        ...state,
        inputs: initialState.inputs,
        postList: state.postList.concat(action.post)
      };
    case 'CLICK_POST':
      console.log(state.postList);
      return {
        ...state,
        postList: state.postList.map(post =>
          (post.id === action.postId ?
            {...post, isSelected: true } :
            {...post, isSelected: false }
          )
        )
      };
    case 'REMOVE_POST':
      return {
        ...state,
        postList: state.postList.filter(post => post.id !== action.postId)
      };
    case 'INCREASE_HIT':
      return {
        ...state,
        postList: state.postList.map(post => post.id === action.postId ? {...post, hit: ++post.hit} : post )
      }
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const { postList } = state;

  const { title, content } = state.inputs;

  const nextId = useRef(4);

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    }); // TODO: key, value 입력없이 가능한지??
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_POST',
      post: {
        id: nextId.current++,
        title,
        content,
        hit: 0,
        isEditable: true,
        isSelected: false
      }
    });
  }, [title, content]);

  const onClick = useCallback(postId => {
    dispatch({
      type: 'CLICK_POST',
      postId
    });
  }, []);

  const onRemove = useCallback(postId => {
    dispatch({
      type: 'REMOVE_POST',
      postId
    });
  }, []);

  const increaseHit = useCallback(postId => {
    dispatch({
      type: 'INCREASE_HIT',
      postId
    })
  });

  return (
    <>
      {/* return 안에는 동등한 레벨의 태그를 병렬로 사용할 수 없어서 하나의 태그로 묶어주어야 함. 이때 사용할 수 있는 임시 태그. */}

      <div className="App">

        <div className="black-nav">
          <div style = { { fontSize : '30px', width: '100%', textAlign: 'center'} }>
            <span>개발 Blog</span>
          </div>
        </div>

        <img src={ logo } style={ { width : '100px' } } />

        {/*<SearchBar />*/}

        <h2>목록({postList.length})</h2>
        {/*<button onClick={ changeOrder } >sort</button>*/}
        {/*<hr/>*/}

        <PostList
          postList={postList}
          onClick={onClick}
          onRemove={onRemove}
          increaseHit={increaseHit}
        />

        <h2>글쓰기</h2>
        <hr/>
        <CreatePost
          title={title}
          content={content}
          onChange={onChange}
          onCreate={onCreate}
        />
      </div>
      <div>

      </div>
    </>
  );
}
export default App;
