import { useMutation } from '@apollo/client';
import { Button, Input, Modal, notification, Popconfirm, Select } from 'antd';

import React, { useEffect, useState } from 'react';
import { PolicyType } from '../../utils/columns';
import { Editor } from '../Editor';
import TransformBox from '../TransformBox';

type Props = {
  open: boolean;
  handleCancel: () => void;
  isEdit: boolean;
  data: PolicyType | undefined;
  refetch: () => void;
  policyKind: KindType[];
};

export function PolicyDetailModal({
  open,
  handleCancel,
  isEdit,
  data,
  refetch,
  policyKind,
}: Props) {
  const [content, setContent] = useState('');
  const [policyKindId, setPolicyKindId] = useState<number>(1);

  const handleClick = () => {
    if (!content.length) {
      return notification.error({ message: '약관 내용을 입력해주세요' });
    }
    const variables = {
      content,
      policyKindId,
    };
    if (!isEdit) {
      // createPolicy({
      //   variables: variables,
      // });
    } else {
      // updatePolicy({
      //   variables: {
      //     ...variables,
      //     id: Number(data?.id ?? -1),
      //   },
      // });
    }
  };

  // create policy
  // const [createPolicy] = useMutation<CreatePolicyResponse, CreatePolicyParams>(
  //   CREATE_POLICY,
  //   {
  //     onCompleted: () => {
  //       notification.success({ message: '약관을 생성했습니다.' });
  //       handleCancel();
  //       refetch();
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });
  //     },
  //   },
  // );

  // update policy
  // const [updatePolicy] = useMutation<UpdatePolicyResponse, UpdatePolicyParams>(
  //   UPDATE_POLICY,
  //   {
  //     onCompleted: () => {
  //       notification.success({ message: '약관을 수정했습니다.' });
  //       handleCancel();
  //       refetch();
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });
  //     },
  //   },
  // );

  // delete policy
  // const [deletePolicy] = useMutation<DeletePolicyResponse, DeletePolicyParams>(
  //   DELETE_POLICY,
  //   {
  //     onCompleted: () => {
  //       notification.success({ message: '약관을 삭제했습니다.' });
  //       handleCancel();
  //       refetch();
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });
  //     },
  //     variables: {
  //       id: data?.id ?? -1,
  //     },
  //   },
  // );

  useEffect(() => {
    if (isEdit) {
      setPolicyKindId(data?.policyKind.id ?? policyKind[0]?.id);
      setContent(data?.content ?? '');
    } else {
      setPolicyKindId(policyKind[0]?.id);
      setContent('');
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
          <>
            <Button type="primary" onClick={handleClick}>
              {isEdit ? '저장' : '등록'}
            </Button>
          </>
        </TransformBox>
      }
    >
      {isEdit && (
        <TransformBox justifyContent="space-between">
          <h3>약관 종류</h3>
          <>
            <Popconfirm
              title="정말 삭제하시겠습니까?"
              okText="삭제"

              // onConfirm={() => deletePolicy()}
            >
              <Button type="primary" danger>
                삭제
              </Button>
            </Popconfirm>
          </>
        </TransformBox>
      )}
      <Select
        value={policyKindId}
        style={{
          width: 150,
        }}
        onChange={setPolicyKindId}
      >
        {policyKind.map((v) => {
          return <Select.Option value={v.id}>{v.name}</Select.Option>;
        })}
      </Select>
      <TransformBox marginBottom="30px" marginTop="30px" flexDirection="column">
        <h3>약관 내용</h3>
        <Editor state={content} setState={setContent} />
      </TransformBox>
    </Modal>
  );
}
