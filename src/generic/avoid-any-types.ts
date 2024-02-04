// let's make this function generic
const fetchData = async <TData>(url: string) => {
    const data: TData = await fetch(url).then((response) => response.json());
    return data;
 };

// we can expect the return type
const data = await fetchData<{ name: string }>(
    "https://swapi.dev/api/people/1",
);
  