import { device, element, expect, by } from 'detox';

describe('Home Page', () => {
  beforeAll(async () => {
    await device.launchApp({});
  });

  it('Anasayfadaki Text Gözüktü mü?', async () => {
    await expect(element(by.id('HomeTitle'))).toHaveText('Rick and Morty');
  });
});
