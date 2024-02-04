const getServerSideProps = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const json: { title: string } = await data.json();
    return {
      props: {
        json,
      },
    };
  };


// 😅 Problem: you always need to pass getServerSideProps
// type InferPropsFromServerSideFunction<T extends typeof getServerSideProps> = Awaited<ReturnType<T>>["props"] 

// Solution
type InferPropsFromServerSideFunction<T> = T extends () => Promise<{props: infer P}> ? P : never

type ServerSideProps = InferPropsFromServerSideFunction<typeof getServerSideProps>