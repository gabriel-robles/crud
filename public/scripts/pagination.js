const pagination = document.querySelector('.pagination')

function active(pagination) {
    const menuItems = document.querySelectorAll('.pagination a')
    const page = pagination.dataset.page

    for (item of menuItems) {
        const itemAttribute = item.getAttribute('href')
        if (itemAttribute.includes(page)) {
            item.classList.add('active')
        }
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage = 0

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPages = currentPage == 1 || currentPage == 2 || currentPage == totalPages - 1 || currentPage == totalPages
        const pageAfterSelectedPage = currentPage <= selectedPage + 1
        const pageBeforeSelectedPage = currentPage >= selectedPage - 1

        if (firstAndLastPages || pageBeforeSelectedPage && pageAfterSelectedPage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push('...')
                
            }
            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

function createPagination(pagination) {
    const find = pagination.dataset.find
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ''

    for (let page of pages) {
        if (String(page).includes('...')) {
            elements += `<span>${page}</span>`
        } else {
            if (find) {
                elements += `<a href="?page=${page}&find=${find}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}

if (pagination) {
    createPagination(pagination)
    active(pagination)
}