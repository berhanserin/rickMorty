import { device, element, expect, by } from 'detox';

describe('Login Page', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('Bölümleri Kaydır', async () => {
    await element(by.id('Episode')).tap();
    await element(by.id('EpisodeList')).scrollToIndex(10);
  });
});
