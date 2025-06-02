import { InferenceClient } from "@huggingface/inference";
import { extractTone, extractTopEmotion } from "@/lib/analyseEmotions";
import vader from "vader-sentiment";
// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
	static task = "text-classification";
	static model = "j-hartmann/emotion-english-distilroberta-base";
	static instance = null;

	static async getInstance() {
		if (this.instance === null) {
			this.instance = new InferenceClient(process.env.NEXT_PUBLIC_HF_KEY);
		}
		return this.instance;
	}
}
// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
	try {
		// Retrieve the classification pipeline
		let classifier = await PipelineSingleton.getInstance();

		// Notify that we're ready to process
		self.postMessage({ status: "ready" });
		// Perform the classification
		const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(
			event.data.text
		);
		const output = await classifier.textClassification({
			model: PipelineSingleton.model,
			inputs: event.data.text,
		});

		const vaderTone = extractTone(intensity);
		console.log("🚀 ~ self.addEventListener ~ vaderTone:", vaderTone);
		const topEmotion = extractTopEmotion(output);
		console.log("🚀 ~ self.addEventListener ~ topEmotion:", topEmotion);
		// Send the output back to the main thread
		self.postMessage({
			status: "complete",
			output: output,
		});
	} catch (error) {
		// Handle any errors
		self.postMessage({
			status: "error",
			error: error.message,
		});
	}
});
