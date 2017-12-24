import { AppPage } from './app.po';

describe('moose-watch App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have layout viewer nav text', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('LAYOUT VIEWER');
  });
});
