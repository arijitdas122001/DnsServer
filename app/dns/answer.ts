import type { answer_interface } from "../types/answer_interface";

class Answer{
    static writeAnswer(answer:answer_interface[]){
        return Buffer.concat(
            answer.map((ele)=>{
                const buffer=Buffer.alloc(10)
                const str_name=ele.domain_name
                .split('.')
                .map(it=>`${String.fromCharCode(it.length)}${it}`)
                .join('')

                buffer.writeInt16BE(ele.type)
                buffer.writeInt16BE(ele.classcode,2)
                buffer.writeInt16BE(ele.ttl,4)
                buffer.writeInt16BE(ele.length,8)

                return Buffer.concat([Buffer.from(str_name+'\0','binary'),buffer,Buffer.from(ele.data+'\0','binary')])
            })
        )
    }
}
export default Answer;