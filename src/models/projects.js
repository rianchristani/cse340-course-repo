import db from './db.js'

const getAllServiceProjects = async() => {
    const query = `
            SELECT 
                p.project_id,
                p.title,
                p.description,
                p.project_location,
                p.project_date,
                o.username AS organization_name,
                o.logo_filename
            FROM public.service_projects p
            INNER JOIN public.organization o ON p.organization_id = o.organization_id;
        `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          project_location,
          project_date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.project_date,
            p.project_location AS location,
            p.organization_id,
            o.username AS organization_name
        FROM service_projects p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.project_location AS location,
            p.organization_id,
            o.username AS organization_name
        FROM service_projects p
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
    const queryParams = [id];
    const result = await db.query(query, queryParams);

    // Retorna apenas o primeiro item encontrado (ou undefined se não existir)
    return result.rows[0];
};

export {getAllServiceProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails};  