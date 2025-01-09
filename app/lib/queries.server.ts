/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User, Course } from '~/types';

export async function getUserById(supabase: any, userId: string): Promise<User> {
    const { data } = await supabase.client
        .from('accounts')
        .select('uid, email, is_teacher, first_name, last_name, profile_image')
        .eq('uid', userId)
        .single();

    return data as User;
}

export async function getUserCourses(supabase: any, user: User): Promise<Course[]> {
    // Return empty array if data is null or undefined
    if (!user) {
        return [];
    }
    if (user.is_teacher) {
        const { data } = await supabase.client.rpc('get_courses_teacher', { user_id_param: user?.uid });
        return (data ?? []) as Course[];
    } else {
        const { data } = await supabase.client.rpc('get_courses_student', { user_id_param: user?.uid });
        return (data ?? []) as Course[];
    }
}

export async function getCourseData(supabase: any, course_id: string): Promise<Course> {
    const { data } = await supabase.client
        .from('courses')
        .select('name, number, owner, join_code, start_date, end_date')
        .eq('course_id', course_id)
        .single();

    return data as Course;
}