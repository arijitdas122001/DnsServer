import * as dgram from "dgram";
import { Opcode, Rcode, type header_Interface } from "./types/headerInterface";
import DnsHeader from "./dns/header";
import { qclass, qtype, type question_Interface } from "./types/questioninterface";
import DnsQuestion from "./dns/question";

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
    qdcount:0,
    ancount:0,
    nscount:0,
    arcount:0,
};

const dnsQuestionStruct:question_Interface={
    name:"codecrafters.io",
    types:qtype.A,
    classcode:qclass.IN
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
        const response=Buffer.concat([header,questions])
        udpSocket.send(response, remoteAddr.port, remoteAddr.address);
    } catch (e) {
        console.log(`Error sending data: ${e}`);
    }
});
