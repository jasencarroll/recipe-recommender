import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Recipe {
	name: string;
	minutes: number;
	complexity_score: number;
	ingredients: string[];
	steps: string[];
}

const INITIAL_STEPS = 3;

function RecipeCard({ recipe }: { recipe: Recipe }) {
	const [expanded, setExpanded] = useState(false);
	const hasMoreSteps = recipe.steps.length > INITIAL_STEPS;
	const visibleSteps = expanded ? recipe.steps : recipe.steps.slice(0, INITIAL_STEPS);

	return (
		<Card className="border-border/60 hover:border-highlight/50 transition-colors duration-200">
			<CardHeader className="pb-3">
				<CardTitle className="text-xl text-text">{recipe.name}</CardTitle>
				<div className="flex gap-4 pt-1 text-sm text-text-muted">
					<span className="flex items-center gap-1.5">
						<ClockIcon />
						{recipe.minutes} minutes
					</span>
					<span className="flex items-center gap-1.5">
						<GaugeIcon />
						Complexity: {recipe.complexity_score}
					</span>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
						Ingredients
					</h4>
					<div className="flex flex-wrap gap-1.5">
						{recipe.ingredients.map((ing) => (
							<span key={ing} className="rounded-full bg-accent/60 px-2.5 py-0.5 text-xs text-text">
								{ing}
							</span>
						))}
					</div>
				</div>
				<div>
					<h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
						Steps
					</h4>
					<ol className="list-inside list-decimal space-y-1 text-sm text-text/90">
						{visibleSteps.map((step, i) => (
							<li key={`step-${i.toString()}`} className="leading-relaxed">
								{step}
							</li>
						))}
					</ol>
					{hasMoreSteps && (
						<button
							type="button"
							onClick={() => setExpanded(!expanded)}
							className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
						>
							{expanded ? 'Show less' : `Show ${recipe.steps.length - INITIAL_STEPS} more steps`}
						</button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

function ClockIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Cook time</title>
			<circle cx="12" cy="12" r="10" />
			<polyline points="12 6 12 12 16 14" />
		</svg>
	);
}

function GaugeIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Complexity</title>
			<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
			<path d="M12 12l4-4" />
			<path d="M12 8v4" />
		</svg>
	);
}

export type { Recipe };
export default RecipeCard;
