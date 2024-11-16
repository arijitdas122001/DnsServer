import type { header_Interface } from "../types/headerInterface";

class DnsHeader{
    static writeOnDns(values:header_Interface){
        const header=Buffer.alloc(12);
        //first section
        header.writeInt32BE(values.id,0);
        //second_section which is the flags
        const {qr,opcode,aa,tc,rd,ra,z,rcode}=values;
        const second_section=qr | opcode | aa | tc | rd |ra | z | rcode;
        header.writeInt32BE(second_section,2); 

        //third_section
        header.writeInt32BE(values.qdcount,4);
        //fourth_section
        header.writeInt32BE(values.ancount,6);
        //fifth_section
        header.writeInt32BE(values.nscount,8);
        //sixth_section
        header.writeInt32BE(values.arcount,10);
        
        return header;
    }
}
export default DnsHeader;