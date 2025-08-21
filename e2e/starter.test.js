describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.launchApp();
  });

  it('should have "Step One" text visible', async () => {
    await expect(element(by.text('Step One'))).toBeVisible();
  });

});
