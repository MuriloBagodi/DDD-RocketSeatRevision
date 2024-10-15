import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { Question } from "../../enterprise/entities/question";
import type { PaginationParams } from "@/core/repositories/pagination-params";

export interface QuestionRepository {
  findBySlug(slug: string): Promise<Question | null>;
  findById(id: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  create(question: Question): Promise<Question>
  save(question: Question): Promise<Question>
  delete(question: Question): Promise<void>
}