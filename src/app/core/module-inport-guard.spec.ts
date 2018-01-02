import { throwIfAlreadyLoaded } from './module-import-guard';

describe('ModuleImportGuard', () => {
  it('should throw error if a module exists', () => {
    const modName = 'test mod';
    expect(function() {
      throwIfAlreadyLoaded('parent', modName);
    }).toThrowError(
      `${modName} has already been loaded. Import ${modName} in the AppModule only.`
    );
  });
});
