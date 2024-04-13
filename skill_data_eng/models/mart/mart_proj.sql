{{
    config(
        --- tags to refer and run the mart layer
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

stg_project AS (

    SELECT
       --- Selecting all the fields of project table
        *

    FROM {{ ref('stg_project') }}
),

left_join_user_project AS (
    --- Match the respective projects to employees using left join
    SELECT
        u.*,
        p.Project_name, p.Project_tech, p.Description, p.Project_status
    FROM stg_user u
    LEFT JOIN 
        stg_project p ON u.Emp_id = p.Emp_id
)

SELECT * FROM  left_join_user_project