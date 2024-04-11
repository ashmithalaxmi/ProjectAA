{{
    config(
        tags=['mart']
    )
}}

WITH

stg_user AS (

    SELECT

        Emp_id, Emp_name, EMAIL, Role, Designation

    FROM {{ ref('stg_user') }}
),

stg_skill AS (
    SELECT

        *

    FROM {{ ref('stg_skill') }}
),

stg_project AS (
    SELECT

        *

    FROM {{ ref('stg_project') }}
),

left_join_skill_project AS (
    SELECT
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