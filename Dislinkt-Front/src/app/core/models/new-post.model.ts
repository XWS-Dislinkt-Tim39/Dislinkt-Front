import { Byte } from "@angular/compiler/src/util";
import { Form } from "@angular/forms";

export interface NewPost {
    text:string;
    dateTimeOfPublishing:Date;
    userId:string;
    followersId:string[];
}
