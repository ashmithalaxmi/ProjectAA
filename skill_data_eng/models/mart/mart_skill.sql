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

left_join_user_skill AS (
    SELECT
        u.*,
        s.Skill_tech, s.Proficiency, s.Certification_link, s.Skill_status
    FROM stg_user u
    LEFT JOIN 
        stg_skill s ON u.Emp_id = s.Emp_id
)

SELECT * FROM  left_join_user_skill