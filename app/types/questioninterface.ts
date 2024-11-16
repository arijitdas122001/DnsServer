export enum qtype{
    A=1,
    NS=2
}
export enum qclass{
    IN=1,
}
export interface question_Interface{
    name:string;
    types:qtype;
    classcode:qclass;
}