type IsPaginationBaseParams = {
  take: number;
  skip: number;
};

type IssearchWordBaseParams = {
  searchWord?: string;
} & IsPaginationBaseParams;

type KindType = {
  id: number;
  name: string;
};
