/* eslint-disable */
import React from "react";
import {useRef, useState} from "react";
import useInputs from "../hooks/useInputs";

function SearchBar() {

  const [{ keyword }, onChange, reset] = useInputs({
    keyword: '',
  });

  const [ result, setResult ] = useState('');

  // TODO: useRef - DOM 객체에 ref 속성으로 객체 지정 시 DOM element 호출 가능해짐
  const keywordInput = useRef();
  const onSearch = () => {
    setResult( "'" + keyword + "' 검색 결과가 존재하지 않습니다." );
    reset();
  };

  const onKeyDown = (e) => {
    if (e.key == 'Enter') onSearch();
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