function spacedRepetition(card, rating) {
    const newFactor = card.factor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    const factor = newFactor < 1.3 ? 1.3 : newFactor;

    const interval = card.reviewCount === 0 ? 1 : (card.reviewCount === 1 ? 6 : Math.round(card.interval * factor));
    const nextReviewDate = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

    return { nextReviewDate, interval, factor };
}

module.exports = spacedRepetition;

