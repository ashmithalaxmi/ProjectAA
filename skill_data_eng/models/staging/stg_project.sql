{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (


    SELECT 
        ID AS Project_id,
        CAST(USERID AS INT) AS Emp_id,
        PROJNAME AS Project_name,
        TECH AS Project_tech,
        DESCRIPTION AS Description,
        STAUS AS Project_status
    FROM {{ source('SMATRIX', 'PROJECT') }}

)


SELECT * FROM required_fields