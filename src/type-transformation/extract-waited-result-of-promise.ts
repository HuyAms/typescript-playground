const getUser = () => {
  return Promise.resolve({
    id: "123",
    name: "John",
    email: "john@example.com",
  });
};

// getUser returns a promise
// we can use Awaited to get the result
type ReturnValue = Awaited<ReturnType<typeof getUser>>;
