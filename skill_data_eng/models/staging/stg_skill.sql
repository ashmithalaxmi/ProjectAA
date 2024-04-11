{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (


    SELECT 
        ID AS Skill_id,
        CAST(USERID AS INT) AS Emp_id,
        TECH AS Skill_tech,
        PROFICIENCY AS Proficiency,
        CERTIFICATION AS Certification_link,
        STAUS AS Skill_status
    FROM {{ source('SMATRIX', 'SKILL') }}

)


SELECT * FROM required_fields