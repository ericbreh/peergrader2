CREATE OR REPLACE FUNCTION public.get_students_in_course(course_id_param text) 
RETURNS SETOF accounts 
LANGUAGE plpgsql AS $function$
BEGIN
    RETURN QUERY
    SELECT a.*
    FROM account_courses ac
    JOIN accounts a ON ac.uid = a.uid
    where ac.course_id = course_id_param;
END; 
$function$;


DROP FUNCTION get_students_in_course(text)
select * from get_students_in_course('d2ad05dB7yPIMqpaCH92R6I56eeaejgipg0f285eAbO8MN2F3swkYV5A0X8C')