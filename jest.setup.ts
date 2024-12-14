beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date("2024-12-14T12:00:00Z"));
});

afterAll(() => {
  jest.useRealTimers();
});
