"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import vader from "vader-sentiment";
// {neg: 0.0, neu: 0.299, pos: 0.701, compound: 0.8545}

const input = "VADER is very smart, handsome, and funny";
export const SentimentAnalysis = () => {
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [vaderResult, setVaderResult] = useState(null);
	const [error, setError] = useState(null);

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
					setResult(e.data.output);
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

	const renderResults = () => {
		if (loading) return "Loading...";
		if (error) return `Error: ${error}`;

		return (
			<div className="space-y-4">
				{result && (
					<div>
						<h3 className="text-lg font-semibold mb-2">Emotion Analysis:</h3>
						<pre className="bg-gray-100 p-2 rounded">
							{JSON.stringify(result, null, 2)}
						</pre>
					</div>
				)}
				{vaderResult && (
					<div>
						<h3 className="text-lg font-semibold mb-2">VADER Sentiment:</h3>
						<pre className="bg-gray-100 p-2 rounded">
							{JSON.stringify(vaderResult, null, 2)}
						</pre>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-12">
			<h1 className="text-5xl font-bold mb-2 text-center">Emotion Analysis</h1>
			<h2 className="text-2xl mb-4 text-center">Powered by Hugging Face</h2>

			<input
				className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
				type="text"
				placeholder="Enter text here"
				onInput={(e) => {
					classify(e.target.value);
				}}
			/>

			{renderResults()}
		</div>
	);
};
