{{
    config(
        tags=['mart']
    )
}}

WITH

stg_user AS (

    SELECT
        --- Selecting the required fields from user table
        Emp_id, Emp_name, EMAIL, Role, Designation

    FROM {{ ref('stg_user') }}
),

stg_skill AS (
    SELECT
        --- Selecting all the fields of skill table
        *

    FROM {{ ref('stg_skill') }}
),

stg_project AS (
    SELECT
        --- Selecting all the fields of skill table
        *

    FROM {{ ref('stg_project') }}
),

left_join_skill_project AS (
    SELECT
     --- Employees with their skills and project are created using left join
        u.*,
        s.Skill_tech, s.Proficiency, s.Certification_link, s.Skill_status,
        p.Project_name, p.Project_tech, p.Description, p.Project_status
    FROM stg_skill s
    LEFT JOIN 
       stg_user u ON s.Emp_id = u.Emp_id
    LEFT JOIN  
        stg_project p ON u.Emp_id = p.Emp_id
)

SELECT * FROM  left_join_skill_project