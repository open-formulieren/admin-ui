// We wrap redirect functions inside an object because ES module named exports are
// immutable and cannot be spied on in Vitest. Spying on object methods is supported
// since they are configurable.
// See: https://vitest.dev/guide/mocking.html#mocking-modules
export const redirect = {
  // Redirect to the default `/admin/login` screen
  toLogin: (nextUrl: string) => {
    const params = new URLSearchParams({next: nextUrl});
    window.location.assign(`${window.location.origin}/admin/login/?${params}`);
  },
};
