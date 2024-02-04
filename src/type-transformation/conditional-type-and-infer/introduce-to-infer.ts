/*
We need to write a util function to get back the type of data

type GetDataValue<T> = unknown;

// returns {name: string, age: number}
type Result = GetDataValue<{data: {name: string, age: number}}>
*/


type GetDataValue<T> = T extends {data: infer TData} ? TData : never

type Result = GetDataValue<{data: {name: string, age: number}}>
type Result2 = GetDataValue<"huy"> // expect never

