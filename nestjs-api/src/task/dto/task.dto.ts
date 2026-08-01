import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsUUID } from "class-validator";

export class CreateTaskDto{
  name!: string;
  @IsUUID()
  userId!: string
  description!: string;
  @IsDate()
  deadline!: string;
  status!: "DONE" | "INPROG"
}

export class UpdateTaskDto extends PartialType(CreateTaskDto){}