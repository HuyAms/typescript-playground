
interface Cache<TValue> {
    set: (key: string, value: TValue) => void,
    get: (key: string) => TValue | undefined
    clone: <U>(transform: (element: TValue) => U) => Cache<U>
}



const createCache = <TValue>(initialCache?: Record<string, TValue>): Cache<TValue> => {
    const cacheObj: Record<string, TValue> = initialCache || {}


    return {
        set: (key, value) => {
            cacheObj[key] = value
        },
        get: (key) => cacheObj[key],
        clone: (transform) => {
            const newCache: Record<string, any> = {}

            for(const key in cache) {
             newCache[key] = transform(cacheObj[key])
            }
     
     
     
             return createCache(newCache)
         }
        }
    }
}

const cache = createCache<number>();

  cache.set("a", 1);
  cache.set("b", 2);

  const a = cache.get("a")
  const b = cache.get("b")

  const stringCache = cache.clone((elem) => {
    return String(elem);
  });

  const result = stringCache.get("a");