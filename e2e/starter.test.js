describe('Login flow E2E', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('shows validation errors for invalid email and password', async () => {
    await expect(element(by.id('login-screen'))).toBeVisible();

    // Ensure email is visible by scrolling if needed
    await waitFor(element(by.id('login-email-input')))
      .toBeVisible()
      .whileElement(by.id('login-scroll'))
      .scroll(100, 'down');

    // Type invalid email, then focus password to trigger email onBlur validation
    await element(by.id('login-email-input')).tap();
    await element(by.id('login-email-input')).typeText('notanemail');

    // Ensure password is visible by scrolling if needed
    await waitFor(element(by.id('login-password-input')))
      .toBeVisible()
      .whileElement(by.id('login-scroll'))
      .scroll(100, 'down');

    await element(by.id('login-password-input')).tap();

    // Type short password, then blur by tapping header logo to trigger password validation
    await element(by.id('login-password-input')).typeText('123');
    await element(by.id('login-logo')).tap();

    await expect(element(by.id('login-email-error'))).toBeVisible();
  });

  it('shows auth error for wrong but valid credentials', async () => {
    await expect(element(by.id('login-screen'))).toBeVisible();

    // Ensure inputs are visible by scrolling if needed
    await waitFor(element(by.id('login-email-input')))
      .toBeVisible()
      .whileElement(by.id('login-scroll'))
      .scroll(100, 'down');

    await element(by.id('login-email-input')).clearText();
    await element(by.id('login-email-input')).typeText('test@example.com');
    await element(by.id('login-logo')).tap();
    await element(by.id('login-password-input')).clearText();
    await element(by.id('login-password-input')).typeText('wrongpass');
    await element(by.id('login-logo')).tap();

    await element(by.id('login-signin-button')).tap();

    await waitFor(element(by.id('login-auth-error')))
      .toBeVisible()
      .withTimeout(4000);
  });

  it('navigates to Home on correct credentials', async () => {
    await expect(element(by.id('login-screen'))).toBeVisible();

    // Ensure inputs are visible by scrolling if needed
    await waitFor(element(by.id('login-email-input')))
      .toBeVisible()
      .whileElement(by.id('login-scroll'))
      .scroll(100, 'down');

    await element(by.id('login-email-input')).clearText();
    await element(by.id('login-email-input')).typeText('test@example.com');
    await element(by.id('login-logo')).tap();
    await element(by.id('login-password-input')).clearText();
    await element(by.id('login-password-input')).typeText('password123');

    await element(by.id('login-logo')).tap();

    await element(by.id('login-signin-button')).tap();

    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(5000);

    await expect(element(by.id('home-title'))).toBeVisible();
    await expect(element(by.id('home-subtitle'))).toBeVisible();
  });
});
