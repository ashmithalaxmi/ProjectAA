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

left_join_user_skill AS (
    --- Match the respective skills to employees using left join
    SELECT
        u.*,
        s.Skill_tech, s.Proficiency, s.Certification_link, s.Skill_status
    FROM stg_user u
    LEFT JOIN 
        stg_skill s ON u.Emp_id = s.Emp_id
)

SELECT * FROM  left_join_user_skill