import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Divider, notification, Table } from 'antd';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Chart } from '../../components/Chart';
import { dashboardInquiryColumns } from '../../utils/columns';

import * as S from './style';

type DashboardStats = {
  [index: string]: any[];
  userCount: {
    date: string;
    count: number;
  }[];
  registrationInfoCount: {
    date: string;
    count: number;
  }[];
  partnershipInquiryCount: {
    date: string;
    count: number;
  }[];
};

export function Dashboard() {
  const [inquiryData, setInquiryData] = useState<any[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardStats>();
  const navigator = useNavigate();

  // get user inquiry list
  // const [seeInquiry, { loading }] = useLazyQuery<
  //   SeeAllInquiryHistoryByAdminResponse,
  //   SeeAllInquiryHistoryByAdminParams
  // >(SEE_ALL_INQUIRY_HISTORY_BY_ADMIN, {
  //   onCompleted: (data) => {
  //     setInquiryData(data.seeAllInquiryHistoryByAdmin.inquiries);
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  //   variables: {
  //     skip: 0,
  //     take: 5,
  //   },
  //   fetchPolicy: 'no-cache',
  // });

  // get dashboard stats
  // const { loading: statLoading } = useQuery<SeeDashboardStatsByAdminResponse>(
  //   SEE_DASHBOARD_STATS_BY_ADMIN,
  //   {
  //     onCompleted: (data) => {
  //       setDashboardData(data.seeDashboardStatsByAdmin);
  //     },
  //     onError: (e) => {
  //       notification.error({ message: e.message });
  //     },
  //     fetchPolicy: 'no-cache',
  //   },
  // );

  const chartTitle = [
    { title: '회원수', keyword: 'userCount' },
    { title: '어게인 등록 번호 개수', keyword: 'registrationInfoCount' },
    { title: '제휴 문의수', keyword: 'partnershipInquiryCount' },
  ];

  // useEffect(() => {

  //     seeInquiry();

  // }, []);
  return (
    <>
      <Divider>대시보드</Divider>
      <S.ChartContainer>
        {chartTitle.map((v, i) => (
          <div key={i}>
            <S.ChartTitle>{v.title}</S.ChartTitle>
            <Chart data={dashboardData ? dashboardData[v.keyword] : []} />
          </div>
        ))}
      </S.ChartContainer>

      <S.Head>
        <h3>1:1 문의</h3>
        <Button
          type="link"
          style={{
            fontSize: 16,
          }}
          onClick={() => {
            navigator('/customer/inquiry');
          }}
        >
          자세히 보기 {'>'}
        </Button>
      </S.Head>
      <Table
        pagination={false}
        rowKey={(rec) => rec.id}
        columns={dashboardInquiryColumns}
        scroll={{ x: 800 }}
        dataSource={inquiryData}
        // loading={loading}
      />
    </>
  );
}
