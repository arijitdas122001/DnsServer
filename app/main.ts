import * as dgram from "dgram";
import { Opcode, Rcode, type header_Interface } from "./types/headerInterface";
import DnsHeader from "./dns/header";
import { qclass, qtype, type question_Interface } from "./types/questioninterface";
import DnsQuestion from "./dns/question";
import { enumType, type answer_interface } from "./types/answer_interface";
import Answer from "./dns/answer";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const dnsHeaderStruct:header_Interface={
    id:1234,
    qr:1 << 15,
    opcode: Opcode.standard_query,
    aa:0,
    tc:0,
    rd:0,
    ra:0,
    z:0,
    rcode:Rcode.noError,
    qdcount:1,
    ancount:0,
    nscount:0,
    arcount:0,
};

const dnsQuestionStruct:question_Interface={
    name:"codecrafters.io",
    types:qtype.A,
    classcode:qclass.IN
}
const DnsAnswerStruct:answer_interface={
    domain_name:"codecrafters.io",
    type:enumType.A,
    classcode:qclass.IN,
    ttl:60,
    length:4,
    data:'\x08\x08\x08\x08',
}
// Uncomment this block to pass the first stage
const udpSocket: dgram.Socket = dgram.createSocket("udp4");
udpSocket.bind(2053, "127.0.0.1");
//
udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
    try {
        console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
        const header=DnsHeader.WriteOnDnsHeaders({...dnsHeaderStruct,qdcount:1});
        const questions=DnsQuestion.WriteQuestion([dnsQuestionStruct]);
        const answer=Answer.writeAnswer([DnsAnswerStruct])
        const response=Buffer.concat([header,questions,answer])
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
