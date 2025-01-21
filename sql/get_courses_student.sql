CREATE OR REPLACE FUNCTION public.get_courses_student (user_id_param uuid) 
RETURNS SETOF courses 
LANGUAGE plpgsql AS $function$
BEGIN
    RETURN QUERY
    SELECT c.*
    FROM account_courses ac
    JOIN courses c ON ac.course_id = c.course_id
    WHERE ac.uid = user_id_param;
END;
$function$;


DROP FUNCTION get_courses_student(uuid)
select * from get_courses_student('7939b35c-1607-4bba-ac78-4479edaac7fe')