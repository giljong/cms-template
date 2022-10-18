import { Modal } from 'antd';
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Loader from '../Loader';

import * as S from './style';

type Props = {
  visible: boolean;
  loading: boolean;
  onCancel: () => void;
  handleFinish: (otp: string[]) => void;
};

export function OtpInputModal({
  visible,
  loading,
  onCancel,
  handleFinish,
}: Props) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const inputRef = useRef<HTMLInputElement[]>([]);

  const handleChangeInput =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setOtp((prev) => {
        prev[index] = e.target.value;
        return [...prev];
      });
      if (e.target.value.length > 0) {
        if (index === 5) {
          return;
        }
        handleFocus(index + 1);
      }
    };

  const handleCancel = () => {
    setOtp((prev) => {
      if (prev.length) {
        prev.map((_v, i) => (prev[i] = ''));
      }
      return [...prev];
    });
    onCancel();
  };

  const handleFocus = (idx: number) => {
    inputRef.current[idx].focus();
  };

  useEffect(() => {
    if (otp[5].length) {
      handleFinish(otp);
    }
  }, [handleFinish, otp]);

  useEffect(() => {
    if (visible) {
      handleFocus(0);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={false}
      centered
      closable={false}
      width={800}
      confirmLoading={loading}
    >
      <S.ModalTitle>OTP 인증번호</S.ModalTitle>
      {loading && <Loader />}
      <S.OtpWrap>
        {otp.map((v, i) => (
          <S.OtpInput
            ref={(elem) => {
              if (elem) {
                inputRef.current[i] = elem;
              }
            }}
            key={i}
            maxLength={1}
            value={otp[i]}
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={handleChangeInput(i)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && i !== 0 && !otp[i].length) {
                handleFocus(i - 1);
              }
              setOtp((prev) => {
                prev[i] = '';
                return [...prev];
              });
            }}
          />
        ))}
      </S.OtpWrap>
    </Modal>
  );
}
