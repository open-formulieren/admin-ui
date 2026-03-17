export type CategoryAncestor = {
  uuid: string;
  name: string;
};

export type Category = {
  url: string;
  name: string;
  uuid: string;
  ancestors: CategoryAncestor[];
  depth: number;
};
