import type { FormEvent } from 'react';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface RecommendFormProps {
	onRecommend: (time: number, complexity: number) => void;
	loading: boolean;
}

function RecommendForm({ onRecommend, loading }: RecommendFormProps) {
	const [time, setTime] = useState(15);
	const [complexity, setComplexity] = useState(20);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		onRecommend(time, complexity);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Get Recommendations</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Label htmlFor="cook-time">Cook Time</Label>
							<span className="text-sm font-medium text-primary">{time} min</span>
						</div>
						<input
							id="cook-time"
							type="range"
							min={0}
							max={30}
							value={time}
							onChange={(e) => setTime(Number(e.target.value))}
							className="w-full"
						/>
						<div className="flex justify-between text-xs text-text-muted">
							<span>0 min</span>
							<span>30 min</span>
						</div>
					</div>

					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Label htmlFor="complexity">Complexity</Label>
							<span className="text-sm font-medium text-primary">{complexity}</span>
						</div>
						<input
							id="complexity"
							type="range"
							min={0}
							max={50}
							value={complexity}
							onChange={(e) => setComplexity(Number(e.target.value))}
							className="w-full"
						/>
						<div className="flex justify-between text-xs text-text-muted">
							<span>0</span>
							<span>50</span>
						</div>
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? 'Loading...' : 'Recommend'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

export default RecommendForm;
