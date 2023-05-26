import React, {Component} from "react";
import * as Sentry from '@sentry/browser';

/**
 * 클래스형 컴포넌트
 */
class ErrorBoundary extends Component {
  state = {
    error: false
  };

  componentDidCatch(error, info) { // 에러 내용, 에러 발생 위치
    console.log('에러 발생');

    console.log({
      error,
      info
    });

    this.setState({
      error: true
    });

    // send catched error to sentry
    if (process.env.NODE_ENV === 'production') { // 현재 환경 조회
      Sentry.captureException(error, { extra: info }); // 운영의 경우 캐치된 오류 전송되지 않아므로 별도 처리 필요
    }
  };

  render() {

    if (this.state.error) {
      return <h1>오류 페이지</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;