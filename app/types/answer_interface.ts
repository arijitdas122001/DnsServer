import type { qclass } from "./questioninterface";

export enum enumType{
    A=1,
    CNAME=5
}
export interface answer_interface{
    domain_name:string,
    type:enumType,
    classcode:qclass,
    ttl:number,
    length:number,
    data:string
}