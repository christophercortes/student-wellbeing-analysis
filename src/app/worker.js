import { InferenceClient } from "@huggingface/inference";

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
const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
	try {
		// Retrieve the classification pipeline
		let classifier = await PipelineSingleton.getInstance();

		// Notify that we're ready to process
		self.postMessage({ status: "ready" });
		// Perform the classification
		const output = await classifier.textClassification({
			model: PipelineSingleton.model,
			inputs: event.data.text,
		});

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
