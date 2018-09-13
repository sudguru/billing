export interface Student {
  id?: number;
  sid: string;
  name: string;
  gender: string;
  guardian: string;
  phone: string;
  email: string;
  address: string;
  previouseducation: string;
  remarks: string;
  balance: number;
  currentclasssn: number;
  rollnumber: number;
  section: string;
  status: string;
  userid: number;
  entrydate?: Date;
  lastupdated: Date;
}

export interface StudentPic {
  id?: number;
  studentid: number;
  picpath: string;
  caption: string;
}
