-- ==========================================
-- Criação da tabela Organization
-- ==========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    username VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(225) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ==========================================
-- Inserção de dados iniciais (Seed Data)
-- ==========================================
INSERT INTO organization (username, description, contact_email, logo_filename)
VALUES 
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'), 
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- ==========================================
-- Team Activities Table
-- ==========================================
CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    project_location VARCHAR(225) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_projects_organization 
    FOREIGN KEY (organization_id) 
    REFERENCES organization (organization_id)
);

-- ==========================================
-- Team Activities information (Seed Data)
-- ==========================================


-- ==========================================
-- 🏢 BRIGHTFUTURE BUILDERS (ID: 1)
-- ==========================================
INSERT INTO service_projects (organization_id, title, description, project_location, project_date)
VALUES
(1, 'Community Center Renovation', 'Help us repaint and repair the main hall of the community center to make it welcoming for everyone.', '123 Hope Ave, Downtown', '2026-08-10'),
(1, 'Eco-Friendly Playground Build', 'Building a modern, sustainable playground using recycled materials for the local park.', 'Oakwood Public Park', '2026-08-25'),
(1, 'Ramp and Accessibility Upgrade', 'Installing wheelchair ramps and improving accessibility for elderly residents in the neighborhood.', '456 Union Street', '2026-09-05'),
(1, 'Library Bookshelf Construction', 'Constructing and assembling custom wooden bookshelves for the community micro-library.', 'Pine Hill Community Library', '2026-09-18'),
(1, 'Community Garden Greenhouse', 'Building a wooden greenhouse frame to shelter delicate plants during the winter season.', 'GreenHarvest Main Plot', '2026-10-02'),

-- ==========================================
-- 🌿 GREENHARVEST GROWERS (ID: 2)
-- ==========================================
(2, 'Urban Orchard Planting', 'Join us in planting 50 fruit-bearing trees to provide fresh, local food to the neighborhood.', 'Eastside Community Garden', '2026-08-15'),
(2, 'Composting Workshop and Setup', 'Learn how to compost and help us build new organic compost bins for community use.', 'West End Garden Plot', '2026-08-29'),
(2, 'Seed Sowing and Soil Prep', 'Preparing the soil beds and sowing seeds for the upcoming autumn harvest season.', 'Central Urban Farm', '2026-09-12'),
(2, 'Rainwater Harvesting System', 'Installing a water collection system to sustain our crops efficiently using natural rainfall.', 'Eastside Community Garden', '2026-09-26'),
(2, 'Hydroponics System Assembly', 'Setting up our first indoor hydroponic system to teach schools about modern agriculture.', 'GreenHarvest Education Hub', '2026-10-10'),

-- ==========================================
-- 🤝 UNITYSERVE VOLUNTEERS (ID: 3)
-- ==========================================
(3, 'Homeless Shelter Meal Service', 'Cooking and serving nutritious warm meals for residents at the local shelter.', 'Downtown Care Center', '2026-08-12'),
(3, 'After-School Tutoring Support', 'Helping elementary school children with their homework, reading skills, and basic math.', 'Unity Youth Center', '2026-08-20'),
(3, 'Park and River Cleanup', 'Collecting litter and cleaning up the riverbank to protect local wildlife and habitats.', 'Riverfront Nature Reserve', '2026-09-02'),
(3, 'Senior Center Games & Social', 'Spending a Saturday afternoon playing board games and chatting with the elderly residents.', 'Silver Oaks Retirement Home', '2026-09-15'),
(3, 'Winter Clothing Drive Sorting', 'Help us sort, organize, and pack donated warm clothes for distribution to families in need.', 'Unity Volunteer Warehouse', '2026-10-05');

-- ADDING category and project_categories tables to support project categorization
-- ==========================================

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    CONSTRAINT uq_categories_name UNIQUE (name)
);

CREATE TABLE project_categories (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    CONSTRAINT pk_project_categories PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_pc_project FOREIGN KEY (project_id) REFERENCES service_projects (project_id) ON DELETE CASCADE,
    CONSTRAINT fk_pc_category FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE
);

-- ==========================================
-- Inserting initial categories
-- ==========================================

INSERT INTO categories (name)
VALUES 
('Construction & Infrastructure'),
('Environment & Sustainability'),
('Community & Social Support'),
('Education & Youth');

-- ==========================================
-- Associating projects with categories
-- ==========================================

INSERT INTO project_categories (project_id, category_id)
VALUES
-- Projetos da BrightFuture Builders (IDs 1 a 5)
(1, 1), -- Community Center Renovation -> Construction
(1, 3), -- Community Center Renovation -> Community Support (Exemplo de projeto com 2 categorias!)
(2, 1), -- Eco-Friendly Playground Build -> Construction
(2, 2), -- Eco-Friendly Playground Build -> Environment
(3, 1), -- Ramp and Accessibility Upgrade -> Construction
(3, 3), -- Ramp and Accessibility Upgrade -> Community Support
(4, 1), -- Library Bookshelf Construction -> Construction
(4, 4), -- Library Bookshelf Construction -> Education
(5, 1), -- Community Garden Greenhouse -> Construction
(5, 2), -- Community Garden Greenhouse -> Environment

-- Projetos da GreenHarvest Growers (IDs 6 a 10)
(6, 2), -- Urban Orchard Planting -> Environment
(6, 3), -- Urban Orchard Planting -> Community Support
(7, 2), -- Composting Workshop and Setup -> Environment
(8, 2), -- Seed Sowing and Soil Prep -> Environment
(9, 2), -- Rainwater Harvesting System -> Environment
(10, 2),-- Hydroponics System Assembly -> Environment
(10, 4),-- Hydroponics System Assembly -> Education

-- Projetos da UnityServe Volunteers (IDs 11 a 15)
(11, 3),-- Homeless Shelter Meal Service -> Community Support
(12, 4),-- After-School Tutoring Support -> Education
(12, 3),-- After-School Tutoring Support -> Community Support
(13, 2),-- Park and River Cleanup -> Environment
(14, 3),-- Senior Center Games & Social -> Community Support
(15, 3);-- Winter Clothing Drive Sorting -> Community Support

-- ==========================================
-- Week 05 - creating more tables
-- ==========================================

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

--

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- Verify the data was inserted
SELECT * FROM roles;

--

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Week 06 - Project Volunteers Table
-- ==========================================
CREATE TABLE project_volunteers (
    project_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_project_volunteers PRIMARY KEY (project_id, user_id),
    CONSTRAINT fk_pv_project FOREIGN KEY (project_id) REFERENCES service_projects (project_id) ON DELETE CASCADE,
    CONSTRAINT fk_pv_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);