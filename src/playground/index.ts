type T123 = '1' | '2' | '3';

type T1 = Exclude<T123, '2'>;

type T2 = Exclude<T123, '1'>;

type T3 = Exclude<T123, '3'>;
