import React, {useCallback, useEffect} from "react";
import {useBlogDispatch, useBlogState} from "../context/BlogContext";

function PostList() {

  const state = useBlogState();
  const dispatch = useBlogDispatch();

  const postList = state?.postList;

  // TODO: Hook
  useEffect(() => { // func
    console.log('컴포넌트 표출(mount) 또는 값 설정');
    console.log(postList);
      return () => {
        console.log('컴포넌트 제거(unmount) 또는 값 수정');
        console.log(postList);
      }; // clean
    }, [postList] // 이 변수가 수정, 삭제 되는 경우에도 함수를 호출. 변수 지정안하면 모든 경우 호출?
  );

  const onClick = useCallback(postId => {
    dispatch({
      type: 'CLICK_POST',
      postId
    });
  }, []);

  return (

    <>
      {/* return 안에는 동등한 레벨의 태그를 병렬로 사용할 수 없어서 하나의 태그로 묶어주어야 함. 이때 사용할 수 있는 임시 태그. */}

      <h2>목록({postList.length})</h2>

      {postList.map((post, index) => (
        <div key={ "post-" + post.id } className="list">
          <h3 onClick={ (e) => { onClick(post.id) } } >
            { post.title }
          </h3>

          {/* 속성에 key 값이 있어야 배열이 효울적으로 랜더링 됨*/}
          <Post key={ "postDetail-" + post.id } style={{display: post.isSelected ? 'block' : 'none'}}
                 post={post} />

          <hr/>
        </div>
      ))}
    </>
  );
}

/**
 * 컴포넌트
 *  : 반복적이거나 동적 HTML 단위를 컴포넌트로 사용 시 성능 개선 시 장점, state 사용 시 복잡한 구조적(pros 사용) 단점
 * @returns {JSX.Element}
 * @constructor
 */
const Post = React.memo(function({post}) {

  const dispatch = useBlogDispatch();

  // TODO: 비구조화 객체 할당
  var { id, title, content, isSelected, isEditable, hit } = post;

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
      {
        isSelected &&
        <div className={'modal'}>
          <p>{ content }</p>

          {/*수정 권한에 따라 수정/삭제 버튼 노출*/}
          { isEditable && <span onClick={ () => onRemove(id) }>❌</span> }
          <span onClick={ (e) => { increaseHit(id) } }>👍</span> { hit }

        </div>
      }
    </>
  );
});

export default React.memo(PostList);