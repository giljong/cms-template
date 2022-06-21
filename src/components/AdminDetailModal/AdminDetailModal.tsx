import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Input,
  Modal,
  notification,
  Popconfirm,
  Table,
} from 'antd';
import * as S from './style';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useMutation } from '@apollo/client';
import { validateEmail, validataPassword } from '../../utils/valitation';
import TransformBox from '../TransformBox';

export type SubmitType = {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  adminRoles: KindType[];
};

type Props = {
  visible: boolean;
  handleCancel: () => void;
  admin?: any;
  refetch: () => void;
  adminRoles: KindType[];
};

export function AdminDetailModal({
  handleCancel,
  visible,
  admin,
  refetch,
  adminRoles,
}: Props) {
  const [isPasswordChange, setPasswordChange] = useState(false);
  const [adminInfo, setAdminInfo] = useState<SubmitType>({
    adminRoles: [
      {
        name: 'READ_DASHBOARD',
        id: 2,
      },
      {
        name: 'READ_PARTNERSHIP_INQUIRY',
        id: 17,
      },
      {
        name: 'READ_INQUIRY',
        id: 7,
      },
    ],
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  const inputStyle = {
    width: '548px',
  };

  const columns = [
    {
      title: '권한명',
      key: 'name',
      dataIndex: 'name',
      align: 'center' as const,
    },
    {
      title: '선택',
      key: 'auth',
      dataIndex: 'id',
      render: (val: number) => {
        return (
          <Checkbox
            checked={adminInfo.adminRoles.findIndex((v) => v.id === val) > -1}
            value={val}
            onChange={handleChangeRole}
            disabled={val === 1 || val === 2 || val === 7 || val === 17}
          />
        );
      },
      align: 'center' as const,
    },
  ];

  const handleClick = () => {
    if (isPasswordChange) {
      setAdminInfo({
        ...adminInfo,
        password: '',
      });
    } else {
      setAdminInfo({
        ...adminInfo,
        password: 'qweasd123@',
      });
    }
    setPasswordChange(!isPasswordChange);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    keyword: string,
  ) => {
    setAdminInfo({
      ...adminInfo,
      [keyword]: e.target.value,
    });
  };

  const handleChangeRole = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setAdminInfo({
        ...adminInfo,
        adminRoles: [
          ...adminInfo.adminRoles,
          {
            name: adminRoles.find((v) => v.id === e.target.value)?.name ?? '',
            id: e.target.value,
          },
        ],
      });
    } else {
      setAdminInfo({
        ...adminInfo,
        adminRoles: adminInfo.adminRoles.filter((v) => v.id !== e.target.value),
      });
    }
  };

  const handleFinish = () => {
    if (!adminInfo.email?.length) {
      return notification.error({ message: '이메일을 입력해주세요' });
    }
    if (validateEmail(adminInfo.email)) {
      return notification.error({ message: '이메일 형식을 맞춰주세요' });
    }
    if (!adminInfo.password?.length) {
      return notification.error({ message: '비밀번호를 입력해주세요' });
    }
    if (validataPassword(adminInfo.password)) {
      return notification.error({
        message:
          '비밀번호는 특수문자 / 문자 / 숫자 포함 형태의 8~15자리로 입력해주세요',
      });
    }
    if (!adminInfo.name?.length) {
      return notification.error({ message: '이름을 입력해주세요' });
    }
    if (!adminInfo.phone?.length) {
      return notification.error({ message: '연락처를 입력해주세요' });
    }
    if (!adminInfo.adminRoles?.[0].name.length) {
      return notification.error({ message: '권한을 선택해주세요' });
    }
    const variables = {
      adminRoleIds: adminInfo.adminRoles.map((v) => v.id),
      email: adminInfo.email,
      name: adminInfo.name,
      password: adminInfo.password,
      phone: adminInfo.phone,
    };
    if (!admin) {
      // createAdmin({
      //   variables: {
      //     ...variables,
      //   },
      // });
    } else {
      // updateAdmin({
      //   variables: {
      //     ...variables,
      //     password: !isPasswordChange ? variables.password : undefined,
      //   },
      // });
    }
  };

  // create admin account
  // const [createAdmin] = useMutation<CreateAdminResponse, CreateAdminParams>(
  //   CREATE_ADMIN,
  //   {
  //     onCompleted: () => {
  //       notification.success({ message: '관리자를 생성했습니다' });
  //       handleCancel();
  //       refetch();
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });

  //       refetch();
  //     },
  //   },
  // );

  // delete admin account
  // const [deleteAdmin] = useMutation<DeleteAdminResponse, DeleteAdminParams>(
  //   DELETE_ADMIN,
  //   {
  //     onCompleted: () => {
  //       notification.success({ message: '관리자를 삭제했습니다' });
  //       handleCancel();
  //       refetch();
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });

  //       refetch();
  //     },
  //     variables: {
  //       email: admin?.email ?? '',
  //     },
  //   },
  // );

  // update admin account
  // const [updateAdmin] = useMutation<UpdateAdminResponse, UpdateAdminParams>(
  //   UPDATE_ADMIN,
  //   {
  //     onCompleted: () => {
  //       notification.success({ message: '관리자 계정을 수정했습니다.' });
  //       handleCancel();
  //       refetch();
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });
  //     },
  //   },
  // );

  useEffect(() => {
    if (admin) {
      setAdminInfo({
        ...admin,
        password: 'qweasd123@',
      });
      setPasswordChange(true);
    } else {
      setAdminInfo({
        adminRoles: [
          {
            name: 'READ_DASHBOARD',
            id: 2,
          },
          {
            name: 'READ_PARTNERSHIP_INQUIRY',
            id: 17,
          },
          {
            name: 'READ_INQUIRY',
            id: 7,
          },
        ],
        email: '',
        name: '',
        password: '',
        phone: '',
      });
      setPasswordChange(false);
    }
  }, [visible]);
  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      title="관리자 생성"
      centered
      width={800}
      footer={false}
      bodyStyle={{
        maxHeight: '90vh',
        overflow: 'auto',
      }}
    >
      <S.FormWrap>
        <S.Label>이메일(아이디)</S.Label>
        <Input
          value={adminInfo.email}
          onChange={(e) => handleChange(e, 'email')}
          disabled={admin ? true : false}
        />
      </S.FormWrap>
      <S.FormWrap>
        <S.Label>비밀번호</S.Label>
        <TransformBox width="100%">
          <Input.Password
            disabled={isPasswordChange}
            style={admin ? inputStyle : undefined}
            value={adminInfo.password}
            onChange={(e) => handleChange(e, 'password')}
          />
          {admin && (
            <Button
              style={{
                marginLeft: 30,
              }}
              onClick={handleClick}
            >
              {isPasswordChange ? '변경' : '취소'}
            </Button>
          )}
        </TransformBox>
      </S.FormWrap>
      <S.FormWrap>
        <S.Label>이름</S.Label>
        <Input
          value={adminInfo.name}
          onChange={(e) => handleChange(e, 'name')}
        />
      </S.FormWrap>
      <S.FormWrap>
        <S.Label>연락처</S.Label>
        <Input
          value={adminInfo.phone}
          onChange={(e) => handleChange(e, 'phone')}
        />
      </S.FormWrap>
      <S.TableWrap>
        <S.Label>권한</S.Label>
        <Table
          columns={columns}
          dataSource={adminRoles}
          pagination={false}
          style={{
            width: 750,
          }}
          bordered
          rowKey={(rec) => rec.id}
          // scroll={{ x: 500 }}
        />
      </S.TableWrap>

      <TransformBox justifyContent="center">
        <>
          <Button type="primary" onClick={handleFinish}>
            {admin ? '수정' : '생성'}
          </Button>
          {admin && (
            <Popconfirm
              // onConfirm={() => deleteAdmin()}
              okText="삭제"
              cancelText="취소"
              title="정말로 삭제하시겠습니까?"
            >
              <Button
                style={{
                  marginLeft: 30,
                }}
                type="primary"
                danger
              >
                삭제
              </Button>
            </Popconfirm>
          )}
        </>
      </TransformBox>
    </Modal>
  );
}
