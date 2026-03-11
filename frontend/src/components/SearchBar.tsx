import type { FormEvent } from 'react';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
	onSearch: (query: string) => void;
	resultCount: number | null;
	loading: boolean;
}

function SearchBar({ onSearch, resultCount, loading }: SearchBarProps) {
	const [query, setQuery] = useState('');

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const trimmed = query.trim();
		if (trimmed) {
			onSearch(trimmed);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex w-full gap-3">
			<Input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search by recipe name or ingredient..."
				className="flex-1"
			/>
			<Button type="submit" disabled={loading || !query.trim()}>
				{loading ? 'Searching...' : 'Search'}
			</Button>
			{resultCount !== null && (
				<span className="flex items-center text-sm text-text-muted whitespace-nowrap">
					{resultCount} result{resultCount !== 1 ? 's' : ''}
				</span>
			)}
		</form>
	);
}

export default SearchBar;
