import { useLazyQuery, useQuery } from '@apollo/client';
import { Modal, notification, Image, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import TransformBox from '../TransformBox';
import * as S from './style';

type Props = {
  email: string;
  open: boolean;
  handleCancel: () => void;
  handleNext: () => void;
  otpSecret: string;
  setOtpSecret: React.Dispatch<React.SetStateAction<string>>;
};

export function OtpQrModal({
  email,
  open,
  handleNext,
  handleCancel,
  otpSecret,
  setOtpSecret,
}: Props) {
  const [imageUrl, setImageUrl] = useState('');

  const handleCopy = () => {
    navigator.clipboard
      .writeText(otpSecret)
      .then(() => {
        notification.success({ message: 'OTP KEY를 복사했습니다.' });
      })
      .catch((e) => {
        notification.error({ message: e.message });
      });
  };

  // get google otp secret qrcode url
  // const [getOtpQr] = useLazyQuery<
  //   CreateOtpQrCodeResponse,
  //   CreateOtpQrCodeParams
  // >(CREATE_OTP_QR_CODE, {
  //   onCompleted: (data) => {
  //     setImageUrl(data.createOtpQrCode.url);
  //     setOtpSecret(data.createOtpQrCode.otpSecret);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  // });

  useEffect(() => {
    if (email.length && open === true) {
      // getOtpQr({
      //   variables: {
      //     email,
      //   },
      // });
    }
  }, [open]);

  return (
    <Modal
      centered
      footer={false}
      onCancel={handleCancel}
      open={open}
      closable={false}
      focusTriggerAfterClose={false}
    >
      <S.QRWrap>
        <Image src={imageUrl} />
      </S.QRWrap>
      <TransformBox
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <S.KeyWrap>key: {otpSecret}</S.KeyWrap>
        <Button onClick={handleCopy}>복사</Button>
      </TransformBox>
      <TransformBox justifyContent="flex-end" marginTop="20px">
        <Button type="primary" onClick={handleNext}>
          다음
        </Button>
      </TransformBox>
    </Modal>
  );
}
