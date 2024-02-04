
// Solution 1: we infer the whole object
const typedObjectKeysFirstSolution = <TObject extends Record<string, any>>(obj: TObject) => {
    return Object.keys(obj) as Array<keyof TObject>;
};

// Solution 2: we infer only keys
const typedObjectKeys = <TKey extends string>(obj: Record<TKey, any>) => {
    return Object.keys(obj) as Array<TKey>
};

// Array<a | b>
const result1 = typedObjectKeys({
    a: 1,
    b: 2,
});
