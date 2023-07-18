import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import { useLazyQuery } from '@apollo/client';
import { userInquiryColumns } from '../../utils/columns';

type Props = {
  email: string;
  selectedKey: string;
};

export function UserInquiryHistory({ email, selectedKey }: Props) {
  const [inquiryData, setInquiryData] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * 10);
  };

  useEffect(() => {
    if (selectedKey === '2') {
    }
  }, [skip, selectedKey]);

  return (
    <>
      <Table
        columns={userInquiryColumns}
        dataSource={inquiryData}
        pagination={{
          current: current,
          total: totalCount,
          onChange: handlePagination,
          position: ['bottomCenter'],
        }}
        // loading={loading}
        rowKey={(rec) => rec.id}
        scroll={{ x: 800 }}
      />
    </>
  );
}
