export default interface huggingFaceEmotion {
	label: emotion;
	score: number;
}

type emotion = "joy" | "sadness" | "fear" | "anger" | "disgust";
