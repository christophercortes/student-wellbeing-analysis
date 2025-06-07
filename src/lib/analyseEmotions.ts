import huggingFaceEmotion from "@/global/huggingFaceEmotion";
import vaderResult from "@/global/vaderResult";

export function extractTopEmotion(
	emotions: huggingFaceEmotion[]
): huggingFaceEmotion {
	// Extract top emotion
	const topEmotion = emotions.sort((a, b) => b.score - a.score)[0];
	const emotionName = topEmotion.label;
	const emotionScore = Math.round(topEmotion.score * 100);
	return {
		label: emotionName,
		score: emotionScore,
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
