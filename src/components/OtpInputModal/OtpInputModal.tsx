import { Modal } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Loader from '../Loader';

import * as S from './style';

type Props = {
  open: boolean;
  loading: boolean;
  onCancel: () => void;
  handleFinish: (otp: string[]) => void;
};

export function OtpInputModal({
  open,
  loading,
  onCancel,
  handleFinish,
}: Props) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const inputRef = useRef<HTMLInputElement[]>([]);

  const handleChangeInput =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setOtp((prev) => {
        prev[index] = e.target.value.replace(/\D/g, '');
        return [...prev];
      });
      if (e.target.value.replace(/\D/g, '').length > 0) {
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
    setTimeout(() => {
      if (inputRef.current.length) inputRef.current[0].focus();
    }, 0);
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={false}
      centered
      closable={false}
      width={800}
      destroyOnClose={false}
      forceRender={false}
    >
      <S.ModalTitle>OTP 인증번호</S.ModalTitle>
      <Loader visible={loading} />
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
            value={v}
            autoFocus={true}
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
