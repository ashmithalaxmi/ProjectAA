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