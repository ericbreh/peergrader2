/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User, Course } from '~/types';
import { createSupabaseServerClient } from './supabase.server';

export default async function setUser(user: User) {
    if (!user) {
        return "error";
    }
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.client
        .from("accounts")
        .upsert([
            {
                uid: user.uid,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                is_teacher: user.is_teacher,
            },
        ])
        .select()
        .single();

    return error;
}

export async function getUserById(userId: string): Promise<User> {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.client
        .from('accounts')
        .select('uid, email, is_teacher, first_name, last_name, profile_image')
        .eq('uid', userId)
        .single();

    return data as User;
}

export async function getUserCourses(user: User): Promise<Course[]> {
    // Return empty array if data is null or undefined
    if (!user) {
        return [];
    }
    const supabase = createSupabaseServerClient();
    if (user.is_teacher) {
        const { data } = await supabase.client.rpc('get_courses_teacher', { user_id_param: user?.uid });
        return (data ?? []) as Course[];
    } else {
        const { data } = await supabase.client.rpc('get_courses_student', { user_id_param: user?.uid });
        return (data ?? []) as Course[];
    }
}

export async function getCourseData(course_id: string): Promise<Course> {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.client
        .from('courses')
        .select('course_id, name, owner, created_at, join_code, number, start_date, end_date')
        .eq('course_id', course_id)
        .single();

    return data as Course;
}

export async function createCourse(
    course_id: string,
    name: string,
    owner: string,
    number: string,
    start_date: Date,
    end_date: Date
) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.client
        .from('courses')
        .insert([
            {
                course_id,
                name,
                owner,
                number,
                start_date,
                end_date
            }
        ])

    return { error };
}

export async function joinCourse(course_id: string, uid: string) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.client
        .from('account_courses')
        .insert([
            {
                course_id,
                uid
            }
        ])

    return error ? { error } : { course_id };
}

export async function joinCourseFromCode(join_code: string, uid: string) {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.client
        .from('courses')
        .select('course_id')
        .eq('join_code', join_code)
        .single();

    if (error) {
        return { error };
    }

    if (!data) {
        return { error: 'Course not found' };
    }

    const result = await joinCourse(data.course_id, uid);
    return result.error ? { error: result.error } : { course_id: data.course_id };
}