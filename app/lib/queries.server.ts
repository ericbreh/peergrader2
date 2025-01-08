import type { User, Course } from '~/types';

export async function getUserById(supabase: any, userId: string): Promise<User> {
    const { data, error } = await supabase.client
        .from('accounts')
        .select('uid, email, is_teacher, first_name, last_name, profile_image')
        .eq('uid', userId)
        .single();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }

    return data as User;
}

// TODO: Teacher vs student
export async function getUserCourses(supabase: any, userId: string): Promise<Course[]> {
    const { data, error } = await supabase.client
        .from('courses')
        .select('course_id, name, number')
        .eq('owner', userId);

    if (error) {
        console.error('Error fetching courses:', error);
        return [];
    }

    return data as Course[];
}

export async function getCourseData(supabase: any, course_id: string): Promise<Course> {
    const { data, error } = await supabase.client
        .from('courses')
        .select('name, number, owner, join_code, start_date, end_date')
        .eq('course_id', course_id)
        .single();

    if (error) {
        console.error('Error fetching course data:', error);
        return null;
    }

    return data as Course;
}