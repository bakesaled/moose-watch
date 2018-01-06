import { LayoutRetrievalStrategy } from '../../../lib/layout/layout-retrieval-strategy';

export class LayoutListItemModel {
  constructor(
    public id: string,
    public name: string,
    public retrievalStrategy: LayoutRetrievalStrategy = LayoutRetrievalStrategy.fileSystem
  ) {}
}
