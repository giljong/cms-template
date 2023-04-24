import { useLazyQuery } from '@apollo/client';
import { Descriptions, Modal, notification, Tabs } from 'antd';

import React, { useEffect, useState } from 'react';
import { UserType } from '../../utils/columns';
import { UserInquiryHistory } from '../UserInquiryHistory/UserInquiryHistory';

type Props = {
  open: boolean;
  email: string;
  handleCancel: () => void;
};

const { TabPane } = Tabs;

export function UserDetailModal({ email, handleCancel, open }: Props) {
  const [user, setUser] = useState<UserType>();
  const [selectedKey, setSeletedKey] = useState('1');

  // get user detail information
  // const [seeUserDetail] = useLazyQuery<
  //   SeeUserDetailByAdminResponse,
  //   SeeUserDetailByAdminParams
  // >(SEE_USER_DETAIL_BY_ADMIN, {
  //   onCompleted: (data) => {
  //     setUser(data.seeUserDetailByAdmin);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  useEffect(() => {
    if (open) {
      // seeUserDetail({
      //   variables: {
      //     email,
      //   },
      // });
    }
    setSeletedKey('1');
  }, [open]);
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={false}
      title={`${user?.nickname}의 상세정보`}
      bodyStyle={{
        maxHeight: '90vh',
        overflow: 'auto',
      }}
      centered
      width={1000}
    >
      <Tabs
        defaultActiveKey="1"
        activeKey={selectedKey}
        onChange={setSeletedKey}
      >
        <TabPane tab={<span>상세정보</span>} key="1">
          <Descriptions bordered>
            <Descriptions.Item
              label="이름"
              span={24}
              labelStyle={{
                width: 100,
              }}
            >
              {user?.name}
            </Descriptions.Item>
            <Descriptions.Item label="닉네임" span={24}>
              {user?.nickname}
            </Descriptions.Item>
            <Descriptions.Item label="이메일" span={24}>
              {user?.email}
            </Descriptions.Item>
            <Descriptions.Item label="전화번호" span={24}>
              {user?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="주소" span={24}>
              {user && user.shippingAddresses.length > 0
                ? user.shippingAddresses
                    .filter((v) => v.isDefault)
                    .map((v) => {
                      return v.address.length
                        ? v.address + ' ' + v.addressDetail
                        : '배송지가 존재하지 않습니다.';
                    })
                : '배송지가 존재하지 않습니다.'}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane tab={<span>1:1 문의</span>} key="2">
          <UserInquiryHistory email={email} selectedKey={selectedKey} />
        </TabPane>
      </Tabs>
    </Modal>
  );
}
