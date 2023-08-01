import { useRecoilState } from 'recoil';
import { pageOptionState } from '../../recoil/atoms/pageOptions';
import { Table as AntdTable, TableProps } from 'antd';

type Props = {
  marginTop?: number;
  scrollWidth?: number;
};

export function CustomTable<T extends object>({
  marginTop,
  scrollWidth = 800,
  ...props
}: Props & TableProps<T>) {
  const [pageOption, setPageOption] = useRecoilState(pageOptionState);
  return (
    <AntdTable
      pagination={{
        position: ['bottomCenter'],
        showSizeChanger: true,
        onChange: (e) => {
          setPageOption({
            ...pageOption,
            skip: (e - 1) * pageOption.take,
            current: e,
          });
        },
        onShowSizeChange: (_current, size) =>
          setPageOption({
            ...pageOption,
            take: size,
          }),
        total: pageOption.total,
        current: pageOption.current,
      }}
      style={{
        marginTop,
      }}
      scroll={{ x: scrollWidth }}
      {...props}
    />
  );
}
