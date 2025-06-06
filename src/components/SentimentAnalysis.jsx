"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import vader from "vader-sentiment";
import { ChartPieLabelList } from "./dashboard/PieChart";
import clsx from "clsx";
// {neg: 0.0, neu: 0.299, pos: 0.701, compound: 0.8545}

const input = "VADER is very smart, handsome, and funny";
export const SentimentAnalysis = () => {
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [vaderResult, setVaderResult] = useState(null);
	const [error, setError] = useState(null);
	const [fileName, setFileName] = useState("");

	// Create a reference to the worker object.
	const worker = useRef(null);

	// We use the `useEffect` hook to set up the worker as soon as the component is mounted.
	useEffect(() => {
		if (!worker.current) {
			// Create the worker if it does not yet exist.
			worker.current = new Worker(
				new URL("../app/worker.js", import.meta.url),
				{
					type: "module",
				}
			);
		}

		// Create a callback function for messages from the worker thread.
		const onMessageReceived = (e) => {
			switch (e.data.status) {
				case "ready":
					setLoading(true);
					break;
				case "complete":
					setResult({
						output: e.data.output,
						vaderTone: e.data.vaderTone,
						topEmotion: e.data.topEmotion,
					});
					setLoading(false);
					break;
				case "error":
					setError(e.data.error);
					setLoading(false);
					break;
			}
		};

		// Attach the callback function as an event listener.
		worker.current.addEventListener("message", onMessageReceived);

		// Define a cleanup function for when the component is unmounted.
		return () =>
			worker.current.removeEventListener("message", onMessageReceived);
	}, []);

	const classify = useCallback((text) => {
		if (!text) return;

		// Reset states
		setError(null);
		setLoading(false);

		// Get VADER sentiment
		const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
		setVaderResult(intensity);

		// Send text to worker for emotion analysis
		if (worker.current) {
			worker.current.postMessage({ text });
		}
	}, []);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type === "text/plain") {
			setFileName(file.name);
			const reader = new FileReader();
			reader.onload = (event) => {
				const text = event.target.result;
				classify(text);
			};
			reader.readAsText(file);
		} else {
			setError("Please select a valid .txt file");
		}
	};

	let summary = null;
	let classNames = null;
	if (result) {
		const { vaderTone: tone, topEmotion } = result;
		const { label: emotion } = topEmotion;
		classNames = clsx({
			"text-orange-500": tone === "positive" && emotion === "joy",
			"text-blue-500": tone === "negative" && emotion === "sadness",
			"text-red-500": tone === "negative" && emotion === "anger",
			"text-yellow-500": tone === "neutral" && emotion === "fear",
			"text-gray-500": tone === "neutral" && emotion === "neutral",
		});
		// Summary message
		const emotionScore = Math.round(result.topEmotion.score);
		if (tone === "positive" && emotion === "joy") {
			summary = `The tone is positive and the main feeling is joy with a ${emotionScore}% score. The student appears emotionally well.`;
		} else if (tone === "negative" && emotion === "sadness") {
			summary = `The tone is negative and the main feeling is sadness with a ${emotionScore}% score. This may suggest signs of depression. Please check on the student.`;
		} else if (tone === "negative" && emotion === "anger") {
			summary = `The tone is negative and the main feeling is anger with a ${emotionScore}% score. This could indicate frustration or bullying. Intervention may be needed.`;
		} else if (tone === "neutral" && emotion === "fear") {
			summary = `The tone is neutral but the main feeling is fear with a ${emotionScore}% score. The student might feel anxious or unsafe. Further observation is recommended.`;
		} else if (tone === "neutral" && emotion === "neutral") {
			summary = `The tone and emotion are neutral. The student's emotional state seems stable.`;
		} else {
			summary = `The tone is ${tone} and the main feeling is ${emotion} with a ${emotionScore}% score. Continue monitoring the student as needed.`;
		}
	}

	const renderResults = () => {
		if (loading) return "Loading...";
		if (error) return `Error: ${error}`;

		return (
			<div className="space-y-4">
				{result && (
					<ChartPieLabelList studentName="pedro" emotions={result.output} />
				)}
				{summary && <p className={classNames || "font-bold"}>{summary}</p>}
			</div>
		);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-12">
			<h1 className="text-5xl font-bold mb-2 text-center">Emotion Analysis</h1>
			<h2 className="text-2xl mb-4 text-center">Powered by Hugging Face</h2>

			<div className="w-full max-w-xs">
				<label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<svg
							className="w-8 h-8 mb-4 text-gray-500"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 16"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
							/>
						</svg>
						<p className="mb-2 text-sm text-gray-500">
							<span className="font-semibold">Click to upload</span> or drag and
							drop
						</p>
						<p className="text-xs text-gray-500">.TXT files only</p>
					</div>
					<input
						type="file"
						className="hidden"
						accept=".txt"
						onChange={handleFileChange}
					/>
				</label>
				{fileName && (
					<p className="mt-2 text-sm text-gray-500 text-center">
						Selected file: {fileName}
					</p>
				)}
			</div>

			{renderResults()}
		</div>
	);
};
