import type { Recipe } from '@/components/RecipeCard';

import { useCallback, useEffect, useState } from 'react';

import RecipeCard from '@/components/RecipeCard';
import RecommendForm from '@/components/RecommendForm';
import SearchBar from '@/components/SearchBar';

interface Stats {
	total_recipes: number;
	clusters: number;
	avg_time: number;
	avg_complexity: number;
}

function Home() {
	const [stats, setStats] = useState<Stats | null>(null);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [searchCount, setSearchCount] = useState<number | null>(null);
	const [searchLoading, setSearchLoading] = useState(false);
	const [recommendLoading, setRecommendLoading] = useState(false);
	const [activeSection, setActiveSection] = useState<'search' | 'recommend' | null>(null);

	useEffect(() => {
		fetch('/api/recipes/stats')
			.then((res) => res.json())
			.then((data: Stats) => setStats(data))
			.catch(() => {});
	}, []);

	const handleSearch = useCallback(async (query: string) => {
		setSearchLoading(true);
		setActiveSection('search');
		try {
			const res = await fetch(`/api/recipes/search?q=${encodeURIComponent(query)}&n=10`);
			if (!res.ok) {
				throw new Error(`Search failed (${res.status})`);
			}
			const data = (await res.json()) as { recipes: Recipe[] };
			setRecipes(data.recipes);
			setSearchCount(data.recipes.length);
		} catch {
			setRecipes([]);
			setSearchCount(0);
		} finally {
			setSearchLoading(false);
		}
	}, []);

	const handleRecommend = useCallback(async (time: number, complexity: number) => {
		setRecommendLoading(true);
		setActiveSection('recommend');
		setSearchCount(null);
		try {
			const res = await fetch(`/api/recipes/recommend?time=${time}&complexity=${complexity}&n=5`);
			if (!res.ok) {
				throw new Error(`Recommendation failed (${res.status})`);
			}
			const data = (await res.json()) as { recipes: Recipe[] };
			setRecipes(data.recipes);
		} catch {
			setRecipes([]);
		} finally {
			setRecommendLoading(false);
		}
	}, []);

	return (
		<div className="mx-auto max-w-5xl px-4 py-8">
			<header className="mb-8 text-center">
				<h1 className="text-4xl font-bold tracking-tight text-text">Recipe Recommender</h1>
				<p className="mt-2 text-text-muted">Find recipes based on your preferences</p>
				{stats && (
					<div className="mt-4 flex items-center justify-center gap-3 text-sm text-text-muted">
						<span className="rounded-full bg-accent/40 px-3 py-1">
							{stats.total_recipes.toLocaleString()} recipes
						</span>
						<span className="rounded-full bg-accent/40 px-3 py-1">{stats.clusters} clusters</span>
						<span className="rounded-full bg-accent/40 px-3 py-1">
							avg {Math.round(stats.avg_time)} min cook time
						</span>
					</div>
				)}
			</header>

			<section className="mb-8">
				<SearchBar
					onSearch={handleSearch}
					resultCount={activeSection === 'search' ? searchCount : null}
					loading={searchLoading}
				/>
			</section>

			<section className="mb-8">
				<RecommendForm onRecommend={handleRecommend} loading={recommendLoading} />
			</section>

			<section>
				{recipes.length > 0 ? (
					<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
						{recipes.map((recipe) => (
							<RecipeCard key={recipe.name} recipe={recipe} />
						))}
					</div>
				) : (
					activeSection && (
						<p className="py-12 text-center text-text-muted">
							No recipes found. Try adjusting your search or preferences.
						</p>
					)
				)}
			</section>
		</div>
	);
}

export default Home;
