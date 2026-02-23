import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesService } from '../services/invoices';

export function useInvoices() {
    const queryClient = useQueryClient();

    const invoicesQuery = useQuery({
        queryKey: ['invoices'],
        queryFn: invoicesService.getAll,
    });

    const createInvoiceMutation = useMutation({
        mutationFn: invoicesService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
        },
    });

    return {
        invoices: invoicesQuery.data || [],
        isLoading: invoicesQuery.isLoading,
        error: invoicesQuery.error,
        createInvoice: createInvoiceMutation.mutateAsync,
        isCreating: createInvoiceMutation.isPending,
    };
}

export function useInvoice(id) {
    return useQuery({
        queryKey: ['invoices', id],
        queryFn: () => invoicesService.getById(id),
        enabled: !!id,
    });
}
