import { llmClient } from '../llm/client';
import { reviewRepository } from '../repositories/review.repository';

export const reviewService = {
  async summarizeReviews(productId: number): Promise<string> {
    // If the summary already exists and is not expired, return it
    const existingSummary = await reviewRepository.getReviewSummary(productId);
    if (existingSummary) {
      return existingSummary;
    }

    const reviews = await reviewRepository.getReviews(productId, 10); // Get the latest 10 reviews for summarization
    const joinedReviews = reviews.map((r) => r.content).join('\n\n');

    const summary = await llmClient.summarizeReviews(joinedReviews);

    await reviewRepository.storeReviewSummary(productId, summary);

    return summary;
  },
};
