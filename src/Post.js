import React, {useEffect} from "react";

function Post({ post, clickPost, onRemove, changeTitle, changeHit }) {

  // TODO: Hook
  useEffect(() => { // func
    console.log('컴포넌트 표출(mount) 또는 값 설정');
    console.log(post);
    //   return () => {
    //     console.log('컴포넌트 제거(unmount) 또는 값 수정');
    //     console.log(post);
    //   }; // clean
    // }, [post] // 이 변수가 수정, 삭제 되는 경우에도 함수를 호출. 변수 지정안하면 모든 경우 호출?
  });

  return (
    <div className="list">
      <h3 onClick={ (e) => { clickPost(post.id) } } >
        { post.title }
      </h3>

      {/*{ post.isSeleted && <Modal post={post}/> }*/}
      {/* 속성에 key 값이 있어야 배열이 효울적으로 랜더링 됨*/}
      <Modal key={post.id} post={post} onRemove={onRemove} changeTitle={changeTitle} changeHit={changeHit}/>

      <hr/>
    </div>
  );
}

/**
 * 컴포넌트
 *  : 반복적이거나 동적 HTML 단위를 컴포넌트로 사용 시 성능 개선 시 장점, state 사용 시 복잡한 구조적(pros 사용) 단점
 * @returns {JSX.Element}
 * @constructor
 */
const Modal = React.memo(function({post, onRemove, changeTitle, changeHit}) {

  // TODO: 비구조화 객체 할당
  var { id, title, content, isSeleted, isEditable, hit } = post;

  return (
    <>
      {
        isSeleted &&
        <div className={'modal'}>
          <p>{ content }</p>

          {/*수정 권한에 따라 수정/삭제 버튼 노출*/}
          { isEditable && <span onClick={ () => onRemove(id) }>❌</span> }
          <span onClick={ (e) => { changeTitle(id) } } > ✨ </span>
          <span onClick={ (e) => { changeHit(id) } }>👍</span> { hit }

        </div>
      }
    </>
  );
});

export default React.memo(Post);