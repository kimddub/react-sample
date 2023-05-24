import {useCallback, useState} from "react";

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ... form, [name]: value })); // arrow 뒤에오는 중괄호를 함수 선언부로 인식하지 않기 위해 ( 괄호 사용

  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
}

export default useInputs;