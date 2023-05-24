/* eslint-disable */
import React from "react";
import {useRef, useState} from "react";

function SearchBar() {

  const [search, setSearchs] = useState({
    keyword: '',
    result: ''
  });
  const { keyword, result } = search;

  // TODO: useRef - DOM 객체에 ref 속성으로 객체 지정 시 DOM element 호출 가능해짐
  const keywordInput = useRef();

  const onChange = (e) => {
    const { value, name } = e.target;
    setSearchs({
      ...search,
      [name]: value // TODO: 키값이 변수인 필드 찾음
    });
  };

  const onKeyDown = (e) => {
    if (e.key == 'Enter') onSearch();
  };
  const onSearch = () => {
    setSearchs({
      ...search,
      result : "'" + keyword + "' 검색 결과가 존재하지 않습니다."
    });
    keywordInput.current.focus();
  };

  return (
    <>
      <div className="search-bar">
        <input name="keyword" value={ keyword } onChange={ onChange } ref={ keywordInput } onKeyDown={ onKeyDown }/>
        <button onClick={ onSearch }> search </button>
        <div>
          { result }
        </div>
      </div>
    </>
  );
}

export default React.memo(SearchBar);