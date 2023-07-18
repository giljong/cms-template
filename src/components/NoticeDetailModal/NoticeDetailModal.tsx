import { useMutation } from '@apollo/client';
import { Button, Input, Modal, notification, Popconfirm, Switch } from 'antd';

import React, { useEffect, useState } from 'react';
import { Editor } from '../Editor';
import TransformBox from '../TransformBox';

type Props = {
  open: boolean;
  handleCancel: () => void;
  isEdit: boolean;
  data: any | undefined;
  refetch: () => void;
};

export function NoticeDetailModal({
  open,
  handleCancel,
  isEdit,
  data,
  refetch,
}: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(' ');
  const [isFix, setisFix] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleClick = () => {
    if (!title.length) {
      return notification.error({ message: '공지사항 제목을 입력해주세요.' });
    }
    if (!content.length) {
      return notification.error({ message: '공지사항 내용을 입력해주세요.' });
    }
    const variables = {
      title,
      content,
      isFix,
    };
    if (!isEdit) {
      // 생성 로직
    } else {
      // 수정 로직
    }
  };

  const handleDelete = () => {};

  useEffect(() => {
    if (isEdit) {
      setTitle(data?.title ?? '');
      setContent(data?.content ?? ' ');
      setisFix(data?.isFix ?? false);
    } else {
      setTitle('');
      setContent(' ');
      setisFix(false);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      width={1000}
      closable={false}
      centered
      footer={
        <TransformBox justifyContent="flex-end">
          <Button onClick={handleCancel}>취소</Button>

          <Button type="primary" onClick={handleClick}>
            {isEdit ? '저장' : '등록'}
          </Button>
        </TransformBox>
      }
    >
      <TransformBox
        alignItems="center"
        justifyContent="space-between"
        marginBottom="10px"
      >
        <>
          <h3>제목</h3>
          {isEdit && (
            <TransformBox>
              <Popconfirm
                title="삭제하시겠습니까?"
                okText="삭제"
                onConfirm={handleDelete}
              >
                <Button type="primary" danger>
                  삭제
                </Button>
              </Popconfirm>
            </TransformBox>
          )}
        </>
      </TransformBox>
      <Input value={title} onChange={handleChange} />
      <TransformBox marginBottom="30px" marginTop="30px" flexDirection="column">
        <TransformBox justifyContent="space-between" alignItems="center">
          <h3>내용</h3>
          <TransformBox>
            <span>고정</span>
            <Switch
              checked={isFix}
              style={{
                margin: '0 10px',
              }}
              onChange={setisFix}
            />
          </TransformBox>
        </TransformBox>
        <Editor state={content} setState={setContent} />
      </TransformBox>
    </Modal>
  );
}
