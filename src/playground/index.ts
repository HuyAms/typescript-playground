class UserPosts {
  user: UserInfo | null;
  posts: Post[] | null;
  constructor() {
    this.user = null;
    this.posts = null;
  }
  async init(userId: string) {
    return Promise.all([
      async () => (this.user = await fetchUser(userId)),
      async () => (this.posts = await fetchPostsForUser(userId)),
    ]);
  }
  getUserName() {
    // ...?
  }
}
