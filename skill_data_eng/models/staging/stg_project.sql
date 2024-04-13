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
        ID AS Project_id,
        CAST(USERID AS INT) AS Emp_id,
        PROJNAME AS Project_name,
        TECH AS Project_tech,
        DESCRIPTION AS Description,
        STAUS AS Project_status
    FROM {{ source('SMATRIX', 'PROJECT') }}

)


SELECT * FROM required_fields