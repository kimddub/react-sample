import {Navigate, useLocation, useSearchParams} from "react-router-dom";

const Todo = () => {

  // const location = useLocation();
  // location.search => 파싱 필요(querystring 패키지 설치)

  const [searchParas, setSearchParams] = useSearchParams();
  const isLoggedIn = searchParas.get('isLoggedIn');

  if (isLoggedIn === 'N') {
    // replace = true 일 경우, 뒤로가기 시 2페이지 전으로 이동
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div>
      <h1>할일</h1>
    </div>
  );
};

export default Todo;