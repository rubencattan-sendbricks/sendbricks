import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quotesService } from '../services/quotes';

export function useQuotes() {
    const queryClient = useQueryClient();

    const quotesQuery = useQuery({
        queryKey: ['quotes'],
        queryFn: quotesService.getAll,
    });

    const createQuoteMutation = useMutation({
        mutationFn: quotesService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotes'] });
        },
    });

    return {
        quotes: quotesQuery.data || [],
        isLoading: quotesQuery.isLoading,
        error: quotesQuery.error,
        createQuote: createQuoteMutation.mutateAsync,
        isCreating: createQuoteMutation.isPending,
    };
}

export function useQuote(id) {
    return useQuery({
        queryKey: ['quotes', id],
        queryFn: () => quotesService.getById(id),
        enabled: !!id,
    });
}
