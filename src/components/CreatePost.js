import React, {useCallback, useRef} from "react";
import {useBlogDispatch, useBlogState} from "../context/BlogContext";

function CreatePost() {

  const state = useBlogState();

  const dispatch = useBlogDispatch();

  const nextId = useRef(4);

  const { title, content } = state?.inputs;

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
  return (
    <div>
      <input
        name="title"
        placeholder="제목"
        onChange={onChange}
        value={title}
      />
      <input
        name="content"
        placeholder="내용"
        onChange={onChange}
        value={content}
      />
      <button onClick={onCreate}>저장</button>
    </div>
  );
}

export default React.memo(CreatePost);