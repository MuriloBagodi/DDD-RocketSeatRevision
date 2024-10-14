import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { Question } from "../../enterprise/entities/question";

export interface QuestionRepository {
  findBySlug(slug: string): Promise<Question | null>;
  findById(id: string): Promise<Question | null>
  create(question: Question): Promise<void>
  save(question: Question): Promise<Question>
  delete(question: Question): Promise<void>
}