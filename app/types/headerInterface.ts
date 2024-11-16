enum Opcode{
    standard_query=0
}
enum Rcode{
    noError=0,
    serverFailure=1,
    nameError=3,
    notImplemented=4,
    refused=5
}
export interface header_Interface{
    id:number,
    qr:number,
    opcode:Opcode,
    aa:number,
    tc:number,
    rd:number,
    ra:number,
    z:number,
    rcode:Rcode,
    qdcount:number,
    ancount:number,
    nscount:number,
    arcount:number
}