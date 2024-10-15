import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Answer } from "../../enterprise/entities/answer";

export interface AnswerRepository {
	create(answer: Answer): Promise<Answer>;
	save(answer: Answer): Promise<Answer>;
	delete(answer: Answer): Promise<void>;
	findAnswerById(id: string): Promise<Answer | null>;
	findManyByQuestionId(params: PaginationParams, questionId: string): Promise<Answer[]>
}
