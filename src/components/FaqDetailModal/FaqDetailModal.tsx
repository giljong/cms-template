import { useMutation } from '@apollo/client';
import { Button, Input, Modal, notification, Popconfirm, Select } from 'antd';

import React, { useEffect, useState } from 'react';
import { Editor } from '../Editor';
import TransformBox from '../TransformBox';

type Props = {
  open: boolean;
  handleCancel: () => void;
  isEdit: boolean;
  data: any | undefined;
  refetch: () => void;
  faqKind: KindType[];
};

export function FaqDetailModal({
  open,
  handleCancel,
  isEdit,
  data,
  refetch,
  faqKind,
}: Props) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [faqKindId, setFaqKindId] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = () => {
    if (!question.length) {
      return notification.error({ message: 'FAQ 질문을 입력해주세요' });
    }
    if (!answer.length) {
      return notification.error({ message: 'FAQ 답변을 입력해주세요' });
    }
    const variables = {
      question,
      answer,
      faqKindId,
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
      setQuestion(data?.question ?? '');
      setAnswer(data?.answer ?? '');
      setFaqKindId(data?.faqKind.id ?? faqKind[0]?.id);
    } else {
      setQuestion('');
      setAnswer('');
      setFaqKindId(faqKind[0]?.id);
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

          <Button type="primary" onClick={handleSubmit}>
            {isEdit ? '저장' : '등록'}
          </Button>
        </TransformBox>
      }
    >
      <TransformBox alignItems="center" justifyContent="space-between">
        <>
          <h3>FAQ 종류</h3>
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
      <Select
        onChange={setFaqKindId}
        value={faqKindId}
        style={{
          width: 150,
        }}
      >
        {faqKind.map((v) => {
          return <Select.Option value={v.id}>{v.name}</Select.Option>;
        })}
      </Select>
      <TransformBox
        alignItems="center"
        justifyContent="space-between"
        marginTop="30px"
      >
        <h3>질문</h3>
      </TransformBox>
      <Input value={question} onChange={handleChange} />
      <TransformBox marginBottom="30px" marginTop="30px" flexDirection="column">
        <h3>답변</h3>
        <Editor state={answer} setState={setAnswer} />
      </TransformBox>
    </Modal>
  );
}
