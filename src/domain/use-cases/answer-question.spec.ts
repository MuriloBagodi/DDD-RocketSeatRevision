import { describe, expect, it } from "vitest";
import type { Answer } from "../entities/answer";
import type { AnswerRepository } from "../repositories/answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

const fakeAnswersRepository: AnswerRepository = {
	create: async (answer: Answer) => {
		return;
	},
};

describe("Answer question use case", () => {
	it("should return a question with a correct answer", async () => {
		const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

		const answer = await answerQuestion.execute({
			content: "nova resposta",
			instructorId: "1",
			questionId: "1",
		});

		expect(answer.content).toEqual("nova resposta");
	});
});
