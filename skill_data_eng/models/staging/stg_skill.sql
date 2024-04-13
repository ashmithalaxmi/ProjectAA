{{
    config(
        --- tags to refer and run the staging folder
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (


    SELECT 
        --- Casting data types and following naming conventions
        ID AS Skill_id,
        CAST(USERID AS INT) AS Emp_id,
        TECH AS Skill_tech,
        PROFICIENCY AS Proficiency,
        CERTIFICATION AS Certification_link,
        STAUS AS Skill_status
    FROM {{ source('SMATRIX', 'SKILL') }}

)


SELECT * FROM required_fields