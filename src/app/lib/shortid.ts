import { nanoid } from "nanoid";
import Hashids from "hashids";
export const shortid=(id:Number)=>{
    const shortid=nanoid(5);
    const hashids = new Hashids();
    const hsid=hashids.encode(String(id));
    return(hsid+shortid)
}
