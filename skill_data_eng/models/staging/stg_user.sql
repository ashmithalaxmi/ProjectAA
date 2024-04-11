{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (


    SELECT 
        CAST(ID AS INT) AS Emp_id,
        NAME AS Emp_name,
        EMAIL,
        PASSWORD,
        TYPES AS Role,
        CONTACT,
        ROLE AS Designation
    FROM {{ source('SMATRIX', 'USER') }}

)


SELECT * FROM required_fields