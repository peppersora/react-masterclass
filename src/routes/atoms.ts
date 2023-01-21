import {atom} from "recoil";

export const isDarkAtom = atom({
    // atom을 위해 key,default 두가지 필요
    key:"isDark",
    default:false,


});