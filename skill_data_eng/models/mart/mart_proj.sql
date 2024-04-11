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

stg_project AS (
    SELECT

        *

    FROM {{ ref('stg_project') }}
),

left_join_user_project AS (
    SELECT
        u.*,
        p.Project_name, p.Project_tech, p.Description, p.Project_status
    FROM stg_user u
    LEFT JOIN 
        stg_project p ON u.Emp_id = p.Emp_id
)

SELECT * FROM  left_join_user_project