import {HandinDto} from "../dto/handin.dto";

export interface HandinByDateModel {
  date: Date,
  handins: HandinDto[]
}
