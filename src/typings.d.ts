declare type JsonType =  boolean | number | string | null | JsonArray | JsonMap;
declare type JsonArray = JsonType[];
declare type JsonMap = { [key: string]: JsonType; };
