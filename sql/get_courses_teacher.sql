CREATE OR REPLACE FUNCTION public.get_courses_teacher (user_id_param uuid) 
RETURNS SETOF courses 
LANGUAGE plpgsql AS $function$
BEGIN
    RETURN QUERY
    SELECT c.*
    FROM courses c
    WHERE c.owner = user_id_param;
END;
$function$;


DROP FUNCTION get_courses_teacher(uuid)
select * from get_courses_teacher('d647afcc-fb40-4859-8e7f-562374d652cc')