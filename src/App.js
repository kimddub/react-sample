/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React, {useCallback, useReducer, useRef} from 'react';
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import SearchBar from "./SearchBar";
import { produce } from "immer";
import ErrorBoundary from "./ErrorBoundary";

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
      // TODO: useState의 함수형 업데이트 시 객체 불변성 유지가 복잡한 경우 Immer 라이브러리 사용(객체 불변성 고려를 최소화하기 위함. 성능 개선은 X)
      return produce(state, draft => {
        draft.inputs[action.name] = action.value;
      });
      // return {
      //   ...state,
      //   inputs: {
      //     ...state.inputs,
      //     [action.name]: action.value
      //   }
      // };
    case 'CREATE_POST':
      return produce(state, draft => {
        draft.inputs = initialState.inputs;
        draft.postList.push(action.post);
      });
      // return {
      //   ...state,
      //   inputs: initialState.inputs,
      //   postList: state.postList.concat(action.post)
      // };
    case 'CLICK_POST':
      return produce(state, draft => {
        draft.postList.forEach(post => post.id === action.postId ? post.isSelected = true : post.isSelected = false);
      });
      // return {
      //   ...state,
      //   postList: state.postList.map(post =>
      //     (post.id === action.postId ?
      //       {...post, isSelected: true } :
      //       {...post, isSelected: false }
      //     )
      //   )
      // };
    case 'REMOVE_POST':
      return produce(state, draft => {
        draft.postList.splice(draft.postList.findIndex(post => post.id === action.postId),1);
      });
      // return {
      //   ...state,
      //   postList: state.postList.filter(post => post.id !== action.postId)
      // };
    case 'INCREASE_HIT':
      return produce(state, draft => {
        draft.postList.find(post => post.id === action.postId).hit++;
      });
      // return {
      //   ...state,
      //   postList: state.postList.map(post => post.id === action.postId ? {...post, hit: ++post.hit} : post )
      // }
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const { postList } = state;

  const { title, content } = state.inputs;

  return (
    <UserDispatch.Provider value={dispatch}>
      {/*useReducer의 dispatch를 deep component까지 전달할 수 있도록 호환하는 태그*/}

      <div className="App">

        <div className="black-nav">
          <div style = { { fontSize : '30px', width: '100%', textAlign: 'center'} }>
            <span>개발 Blog</span>
          </div>
        </div>

        <img src={ logo } style={ { width : '100px' } } />

        <SearchBar />

        <h2>목록({postList.length})</h2>
        {/*<button onClick={ changeOrder } >sort</button>*/}
        {/*<hr/>*/}

        <ErrorBoundary>
          {/*하위 component 내에서 오류 발생(props 누락 등) 시 이를 감지하고 예외 처리를 수행하는 태그*/}

          <PostList
            // postList={postList}
            // onClick={onClick}
            // onRemove={onRemove}
            // increaseHit={increaseHit}
          />
        </ErrorBoundary>

        <h2>글쓰기</h2>
        <hr/>
        <CreatePost
          title={title}
          content={content}
          // onChange={onChange}
          // onCreate={onCreate}
        />
      </div>
      <div>

      </div>
    </UserDispatch.Provider>
  );
}
export default App;
