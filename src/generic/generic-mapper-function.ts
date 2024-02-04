

type User = {
    firstName: string,
    lastName: string
}
export const concatenateFirstNameAndLastName = <T extends User>(user: T) => {
    return {
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
    };
  };

  const users = [
    {
      id: "123",
      firstName: "Matt",
      lastName: "Pocock",
    },
  ];

  // the newUsers can keep its full properties + fullName: string
  const newUsers = users.map(concatenateFirstNameAndLastName);