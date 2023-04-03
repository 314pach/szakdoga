import {CommitmentDto} from "../dto/commitment.dto";
import {ApplicationUserDto} from "../dto/application-user.dto";

export interface CommitmentByUserModel {
  student: ApplicationUserDto,
  commitments: CommitmentDto[]
}
