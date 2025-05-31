interface huggingFaceEmotion {
	label: string;
	score: number;
}

interface vaderResult {
	compound: number;
}

export function extractTopEmotion(emotions: huggingFaceEmotion[]) {
	// Extract top emotion
	const topEmotion = emotions.sort((a, b) => b.score - a.score)[0];
	const emotionName = topEmotion.label;
	const emotionScore = Math.round(topEmotion.score * 100);
	return {
		emotionName,
		emotionScore,
	};
}

export function extractTone(vr: vaderResult) {
	const tone =
		vr.compound >= 0.05
			? "positive"
			: vr.compound <= -0.05
			? "negative"
			: "neutral";
	return tone;
}
