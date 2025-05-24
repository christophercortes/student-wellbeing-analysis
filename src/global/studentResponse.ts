import { IStudent } from "@/models/Student";

export interface StudentResponse extends IStudent {
	_id: string;
}
