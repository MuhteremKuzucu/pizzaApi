"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

module.exports = (req, res, next) => {

    /* FILTERING & SEARCHING & SORTING & PAGINATION */

    //* FILTERING: mutlak esitlik arar
    // URL?filter[fieldName1]=value1&filter[filedName2]=value2
    const filter = req.query?.filter || {}

    //* SEARCHING: kismi esitlik arar
    // URL?search[fieldName1]=value1&search[filedName2]=value2
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    const search = req.query?.search || {}
    for (let key in search) search[key] = { $regex: search[key], $options: 'i' } // i: case insensitive

    //* SORTING:
    // URL?sort[fieldName1]=asc&sort[filedName2]=desc 
    // asc: A-Z - desc: Z-A
    const sort = req.query?.sort || {}

    //* PAGINATION:
    // URL?page=3&limit=15&skip=20

    // LIMIT:
    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20) 

    // PAGE:
    let page = Number(req.query?.page)
    page = page > 0 ? page : 1

    // SKIP
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page - 1) * limit

    /* FILTERING & SEARCHING & SORTING & PAGINATION */

    // Run for output:
    res.getModelList = async (Model,  populate = null) => {
        return await Model.find({ ...filter, ...search  }).sort(sort).skip(skip).limit(limit).populate(populate)
    }

    // Details:
    res.getModelListDetails = async (Model) => {

        const data = await Model.find({ ...filter, ...search })

        let details = {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            totalRecords: data.length,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                total: Math.ceil(data.length / limit)
            },
        };

        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next);
        if (details.totalRecords <= limit) details.pages = false;

        return details
    }
    
    next()
}