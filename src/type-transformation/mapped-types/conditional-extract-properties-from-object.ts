interface Example {
    name: string;
    age: number;
    id: string;
    organisationId: string;
    groupId: string;
}

type SearchForId = `${string}${"id" | "Id"}${string}` 


type OnlyId<T extends Record<string, any>> = {
    [K in keyof T as K extends SearchForId ? K : never]: T[K]
}

type Result = OnlyId<Example>
