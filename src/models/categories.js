import db from './db.js'

const getAllServiceCategories = async() => {
    const query = `
            SELECT 
                c.category_id,
                c.name
            FROM public.categories c;
        `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllServiceCategories}  