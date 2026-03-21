function getLastPage(meta) {
    if (!meta || typeof meta !== 'object')
        return undefined;
    if ('last_page' in meta && typeof meta.last_page === 'number')
        return meta.last_page;
    if ('pagination' in meta && meta.pagination && typeof meta.pagination === 'object' && 'total_pages' in meta.pagination && typeof meta.pagination.total_pages === 'number') {
        return meta.pagination.total_pages;
    }
    return undefined;
}
export async function* paginate(fetchPage) {
    let page = 1;
    while (true) {
        const current = await fetchPage(page);
        const items = current.data ?? [];
        for (const item of items) {
            yield item;
        }
        const lastPage = getLastPage(current.meta);
        if (!lastPage || page >= lastPage)
            return;
        page += 1;
    }
}
