import type { question_Interface } from "../types/questioninterface";
// name:string;
// types:number;
// classcode:number;
class DnsQuestion{
    static WriteQuestion(questions:question_Interface[]){
        return Buffer.concat(questions.map((q)=>{
            const typeAndClass = Buffer.alloc(4)
                const str=q.name
                .split('.')
                .map((s:string)=>`${String.fromCharCode.apply(s.length)}${s}`)
                .join('')

                typeAndClass.writeInt16BE(q.types)
                typeAndClass.writeInt16BE(q.classcode,2)
            return Buffer.concat([Buffer.from(str + '\0','binary'),typeAndClass])
        })
    )
}
}

export default DnsQuestion;